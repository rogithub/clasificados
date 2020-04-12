using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Entities;
using Repositories;
using AutoMapper;

namespace Clasificados
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromSeconds(10);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            string connString = ConfigurationExtensions.GetConnectionString(this.Configuration, "Default");
            string clientApp = Configuration["ClientAddress"];

            ILogger logger = new LoggerConfiguration()
                .ReadFrom.Configuration(this.Configuration)
                .CreateLogger();

            services.AddSingleton<ILogger>(logger);

            services.AddControllers(cfg =>
            {
                cfg.Filters.Add(new Clasificados.Filters.ValidateModelAttribute());
                cfg.Filters.Add(new Clasificados.Filters.ErrorHandlerAttribute(logger));
            });

            services.AddTransient<ReactiveDb.IDatabase>((svc) =>
            {
                return new ReactiveDb.Database(connString);
            });

            services.AddTransient(typeof(IBaseRepo<Empleo>), typeof(EmpleosRepo));
            services.AddTransient(typeof(IBaseRepo<Inmueble>), typeof(InmueblesRepo));
            services.AddTransient(typeof(IBaseRepo<Vehiculo>), typeof(VehiculosRepo));
            services.AddTransient(typeof(IBaseRepo<Varios>), typeof(VariosRepo));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSession();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

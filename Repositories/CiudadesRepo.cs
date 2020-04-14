using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;
using System.Reactive.Linq;

namespace Repositories
{
    public interface ICiudadesRepo
    {
        IEnumerable<Ciudad> GetAll();
    }

    public class CiudadesRepo : ICiudadesRepo
    {
        protected IDatabase Db { get; set; }

        public CiudadesRepo(IDatabase db)
        {
            this.Db = db;
        }

        protected Ciudad GetData(IDataReader dr)
        {
            return new Ciudad()
            {
                Id = dr.GetInt("id"),
                EstadoId = dr.GetInt("idestado"),
                Url = dr.GetString("url"),
                Nombre = dr.GetString("nombre")
            };
        }

        public IEnumerable<Ciudad> GetAll()
        {
            List<Ciudad> list = new List<Ciudad>();
            var sql = "SELECT * FROM public.ciudades";
            var cmd = sql.ToCmd(CommandType.Text);
            var estadosObs = Db.ExecuteDataReader(cmd, GetData);
            estadosObs.Subscribe(it =>
            {
                list.Add(it);
            });

            return list;
        }
    }
}

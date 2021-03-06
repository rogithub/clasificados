using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;
using System.Reactive.Linq;

namespace Repositories
{
    public interface IEstadosRepo
    {
        IEnumerable<Estado> GetAll();
    }

    public class EstadosRepo : IEstadosRepo
    {
        protected IDatabase Db { get; set; }

        public EstadosRepo(IDatabase db)
        {
            this.Db = db;
        }
        protected Estado GetData(IDataReader dr)
        {
            return new Estado()
            {
                Id = dr.GetInt("id"),
                Url = dr.GetString("url"),
                Nombre = dr.GetString("nombre")
            };
        }


        public IEnumerable<Estado> GetAll()
        {
            List<Estado> list = new List<Estado>();
            var sql = "SELECT * FROM public.estados";
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

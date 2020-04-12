using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

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

        protected Ciudad GetDataCiudad(IDataReader dr)
        {
            return new Ciudad()
            {
                Id = dr.GetInt("id"),
                EstadoId = dr.GetInt("estadoid"),
                Url = dr.GetString("url"),
                Nombre = dr.GetString("nombre")
            };
        }

        public IEnumerable<Estado> GetAll()
        {
            var sql = "SELECT * FROM public.estados";
            var cmd = sql.ToCmd(CommandType.Text);

            var estados = Db.ExecuteDataReader(cmd, GetData).ToVal<Estado[]>();
            foreach (var estado in estados)
            {
                sql = "SELECT * FROM public.ciudades where idestado = @idestado";
                var param = "@id".ToParam(DbType.Int64, estado.Id);
                cmd = sql.ToCmd(CommandType.Text);
                var ciudades = Db.ExecuteDataReader(cmd, GetDataCiudad).ToVal<Ciudad[]>();
                estado.Ciudades = ciudades;
            }

            return estados;
        }
    }
}

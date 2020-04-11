using System;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

namespace Repositories
{
    public class VariosRepo : BaseRepo<Varios>, IBaseRepo<Varios>
    {
        public VariosRepo(IDatabase db) : base(db)
        {

        }

        protected override string GetByIdSql =>
        @"SELECT id, idEstado, idCiudad, descripcion, fecha, activo
            FROM 
        public.varios WHERE id=@id AND activo=TRUE;";
        protected override string SerchSql =>
        @"SELECT 
            id, idEstado, idCiudad, descripcion, fecha, activo
            COUNT(*) OVER() as total_rows 
        FROM 
            public.varios WHERE activo=TRUE {0} 
        ORDER BY 
            {1}
        LIMIT @limit OFFSET @offset;";

        protected override string DeleteSql =>
        @"UPDATE public.varios SET activo=FALSE WHERE id=@id;";

        protected override string UpdateSql =>
        @"UPDATE public.varios SET
                descripcion=@descripcion,
                fecha=@fecha
             WHERE id=@id;";

        protected override string SaveSql =>
        @"INSERT INTO public.varios 
            (idEstado, idCiudad, descripcion, fecha, activo) 
            VALUES 
            (@idEstado, @idCiudad, @descripcion, @fecha, @activo);";

        protected override Varios GetData(IDataReader dr)
        {
            return new Varios()
            {
                Id = dr.GetInt("id"),
                EstadoId = dr.GetInt("idEstado"),
                CiudadId = dr.GetInt("idCiudad"),
                Fecha = dr.GetDate("fecha"),
                Activo = dr.GetValue<bool>("activo"),
                Descripcion = dr.GetString("descripcion")
            };
        }

        protected override IDbDataParameter[] ToUpdateParams(Varios model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@id"],
                d["@idEstado"],
                d["@idCiudad"],
                d["@descripcion"],
                d["@fecha"],
            };
        }

        protected override IDbDataParameter[] ToSaveParams(Varios model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@idEstado"],
                d["@idCiudad"],
                d["@descripcion"],
                d["@fecha"],
                d["@activo"]
            };
        }

        protected override Dictionary<string, IDbDataParameter> ToParams(Varios model)
        {
            return new Dictionary<string, IDbDataParameter>() {
                { "@id", "@id".ToParam(DbType.Int64, model.Id) },
                { "@idEstado", "@idEstado".ToParam(DbType.Int64, model.EstadoId) },
                { "@idCiudad", "@idCiudad".ToParam(DbType.Int64, model.CiudadId) },
                { "@descripcion", "@descripcion".ToParam(DbType.String, model.Descripcion) },
                { "@fechacreado", "@fechacreado".ToParam(DbType.DateTime, model.Fecha) },
                { "@activo", "@activo".ToParam(DbType.Boolean, model.Activo) }
            };
        }
    }
}

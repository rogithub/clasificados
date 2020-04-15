using System;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

namespace Repositories
{
    public class EmpleosRepo : BaseRepo<Empleo>, IBaseRepo<Empleo>
    {
        public EmpleosRepo(IDatabase db) : base(db)
        {

        }

        protected override string GetByIdSql =>
        @"SELECT id, idciudad, descripcion, fecha, activo
            FROM 
        public.empleos WHERE id=@id AND activo=TRUE;";
        protected override string SerchSql =>
        @"SELECT 
            v.id, v.idciudad, v.descripcion, v.fecha, v.activo
            COUNT(*) OVER() as total_rows 
        FROM 
            public.empleos v inner join public.ciudades c on 
                v.idciudad = c.id
            WHERE 
                v.activo=TRUE
                {0}                 
        ORDER BY 
            v.fecha desc
        LIMIT @limit OFFSET @offset;";

        protected override string DeleteSql =>
        @"UPDATE public.empleos SET activo=FALSE WHERE id=@id;";

        protected override string UpdateSql =>
        @"UPDATE public.empleos SET
                descripcion=@descripcion,
                fecha=@fecha
             WHERE id=@id;";

        protected override string SaveSql =>
        @"INSERT INTO public.empleos 
            (idciudad, descripcion, fecha, activo) 
            VALUES 
            (@idciudad, @descripcion, @fecha, @activo);";

        protected override Empleo GetData(IDataReader dr)
        {
            return new Empleo()
            {
                Id = dr.GetInt("id"),
                CiudadId = dr.GetInt("idciudad"),
                Fecha = dr.GetDate("fecha"),
                Activo = dr.GetValue<bool>("activo"),
                Descripcion = dr.GetString("descripcion")
            };
        }

        protected override IDbDataParameter[] ToUpdateParams(Empleo model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@id"],
                d["@idciudad"],
                d["@descripcion"],
                d["@fecha"],
            };
        }

        protected override IDbDataParameter[] ToSaveParams(Empleo model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@idciudad"],
                d["@descripcion"],
                d["@fecha"],
                d["@activo"]
            };
        }

        protected override Dictionary<string, IDbDataParameter> ToParams(Empleo model)
        {
            return new Dictionary<string, IDbDataParameter>() {
                { "@id", "@id".ToParam(DbType.Int64, model.Id) },
                { "@idciudad", "@idciudad".ToParam(DbType.Int64, model.CiudadId) },
                { "@descripcion", "@descripcion".ToParam(DbType.String, model.Descripcion) },
                { "@fecha", "@fecha".ToParam(DbType.DateTime, model.Fecha) },
                { "@activo", "@activo".ToParam(DbType.Boolean, model.Activo) }
            };
        }
    }
}

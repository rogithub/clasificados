using System;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

namespace Repositories
{
    public class InmueblesRepo : BaseRepo<Inmueble>, IBaseRepo<Inmueble>
    {
        public InmueblesRepo(IDatabase db) : base(db)
        {

        }

        protected override string GetByIdSql =>
        @"SELECT id, idEstado, idCiudad, ventarenta, casaterreno, descripcion, fecha, activo
            FROM 
        public.inmuebles WHERE id=@id AND activo=TRUE;";
        protected override string SerchSql =>
        @"SELECT 
            id, idEstado, idCiudad, ventarenta, casaterreno, descripcion, fecha, activo
            COUNT(*) OVER() as total_rows 
        FROM 
            public.inmuebles WHERE activo=TRUE {0} 
        ORDER BY 
            {1}
        LIMIT @limit OFFSET @offset;";

        protected override string DeleteSql =>
        @"UPDATE public.inmuebles SET activo=FALSE WHERE id=@id;";

        protected override string UpdateSql =>
        @"UPDATE public.inmuebles SET
                ventarenta=@ventarenta,
                casaterreno=@casaterreno,
                descripcion=@descripcion,
                fecha=@fecha
             WHERE id=@id;";

        protected override string SaveSql =>
        @"INSERT INTO public.inmuebles 
            (idEstado, idCiudad, ventarenta, casaterreno, descripcion, fecha, activo) 
            VALUES 
            (@idEstado, @idCiudad, @ventarenta, @casaterreno, @descripcion, @fecha, @activo);";

        protected override Inmueble GetData(IDataReader dr)
        {
            return new Inmueble()
            {
                Id = dr.GetInt("id"),
                EstadoId = dr.GetInt("idEstado"),
                CiudadId = dr.GetInt("idCiudad"),
                VentaRenta = (VentaRenta)dr.GetInt("ventarenta"),
                CasaTerreno = (CasaTerreno)dr.GetInt("casaterreno"),
                Fecha = dr.GetDate("fecha"),
                Activo = dr.GetValue<bool>("activo"),
                Descripcion = dr.GetString("descripcion")
            };
        }

        protected override IDbDataParameter[] ToUpdateParams(Inmueble model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@id"],
                d["@idEstado"],
                d["@idCiudad"],
                d["@ventarenta"],
                d["@casaterreno"],
                d["@descripcion"],
                d["@fecha"],
            };
        }

        protected override IDbDataParameter[] ToSaveParams(Inmueble model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@idEstado"],
                d["@idCiudad"],
                d["@ventarenta"],
                d["@casaterreno"],
                d["@descripcion"],
                d["@fecha"],
                d["@activo"]
            };
        }

        protected override Dictionary<string, IDbDataParameter> ToParams(Inmueble model)
        {
            return new Dictionary<string, IDbDataParameter>() {
                { "@id", "@id".ToParam(DbType.Int64, model.Id) },
                { "@idEstado", "@idEstado".ToParam(DbType.Int64, model.EstadoId) },
                { "@idCiudad", "@idCiudad".ToParam(DbType.Int64, model.CiudadId) },
                { "@ventarenta", "@ventarenta".ToParam(DbType.Int32, model.VentaRenta) },
                { "@casaterreno", "@casaterreno".ToParam(DbType.Int32, model.CasaTerreno) },
                { "@descripcion", "@descripcion".ToParam(DbType.String, model.Descripcion) },
                { "@fechacreado", "@fechacreado".ToParam(DbType.DateTime, model.Fecha) },
                { "@activo", "@activo".ToParam(DbType.Boolean, model.Activo) }
            };
        }
    }
}

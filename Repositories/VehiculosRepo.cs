using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

namespace Repositories
{
    public class VehiculosRepo : BaseRepo<Vehiculo>, IBaseRepo<Vehiculo>
    {
        public VehiculosRepo(IDatabase db) : base(db)
        {

        }

        protected override string GetByIdSql =>
        @"SELECT id, idciudad, marca, modelo, año, descripcion, fecha, activo
        FROM public.vehiculos WHERE id=@id AND activo=TRUE;";
        protected override string SerchSql =>
        @"SELECT 
            v.id, v.idciudad, v.marca, v.modelo, v.año, v.descripcion, v.fecha, v.activo,
            COUNT(*) OVER() as total_rows 
        FROM 
            public.vehiculos v inner join public.ciudades c on 
                v.idciudad = c.id       
            WHERE 
                v.activo=TRUE   AND                
                c.id = @ciudad
                {0}                 
        ORDER BY 
            v.fecha desc
        LIMIT @limit OFFSET @offset;";

        protected override string DeleteSql =>
        @"UPDATE public.vehiculos SET activo=FALSE WHERE id=@id;";

        protected override string UpdateSql =>
        @"UPDATE public.vehiculos SET
                descripcion=@descripcion,
                marca=@marca,
                modelo=@modelo,
                año=@año,
                fecha=@fecha
             WHERE id=@id;";

        protected override string SaveSql =>
        @"INSERT INTO public.vehiculos 
            (idciudad, marca, modelo, año, descripcion, fecha, activo) 
            VALUES 
            (@idciudad, @marca, @modelo, @año, @descripcion, @fecha, @activo);";

        protected override Vehiculo GetData(IDataReader dr)
        {
            return new Vehiculo()
            {
                Id = dr.GetInt("id"),
                CiudadId = dr.GetInt("idciudad"),
                Marca = dr.GetString("marca"),
                Modelo = dr.GetString("modelo"),
                Año = dr.GetInt("año"),
                Fecha = dr.GetDate("fecha"),
                Activo = dr.GetValue<bool>("activo"),
                Descripcion = dr.GetString("descripcion")
            };
        }

        protected override IDbDataParameter[] ToUpdateParams(Vehiculo model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@id"],
                d["@idciudad"],
                d["@marca"],
                d["@modelo"],
                d["@año"],
                d["@descripcion"],
                d["@fecha"],
            };
        }

        protected override IDbDataParameter[] ToSaveParams(Vehiculo model)
        {
            var d = ToParams(model);
            return new IDbDataParameter[] {
                d["@idciudad"],
                d["@marca"],
                d["@modelo"],
                d["@año"],
                d["@fecha"],
                d["@descripcion"],
                d["@activo"]
            };
        }

        protected override Dictionary<string, IDbDataParameter> ToParams(Vehiculo model)
        {
            return new Dictionary<string, IDbDataParameter>() {
                { "@id", "@id".ToParam(DbType.Int64, model.Id) },
                { "@idciudad", "@idciudad".ToParam(DbType.Int64, model.CiudadId) },
                { "@marca", "@marca".ToParam(DbType.String, model.Marca) },
                { "@modelo", "@modelo".ToParam(DbType.String, model.Modelo) },
                { "@año", "@año".ToParam(DbType.Int32, model.Año) },
                { "@descripcion", "@descripcion".ToParam(DbType.String, model.Descripcion) },
                { "@fecha", "@fecha".ToParam(DbType.DateTime, model.Fecha) },
                { "@activo", "@activo".ToParam(DbType.Boolean, model.Activo) }
            };
        }
    }
}

using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Entities;
using ReactiveDb;

namespace Repositories
{
    public abstract class BaseRepo<T> : IBaseRepo<T>
    {
        protected IDatabase Db { get; set; }
        protected abstract string GetByIdSql { get; }
        protected abstract string SerchSql { get; }
        protected abstract string DeleteSql { get; }
        protected abstract string UpdateSql { get; }
        protected abstract string SaveSql { get; }
        public BaseRepo(IDatabase db)
        {
            this.Db = db;
        }
        protected abstract T GetData(IDataReader dr);
        protected abstract IDbDataParameter[] ToUpdateParams(T model);
        protected abstract IDbDataParameter[] ToSaveParams(T model);
        protected abstract Dictionary<string, IDbDataParameter> ToParams(T model);

        protected Resultset<T> GetResultSet(IDataReader dr)
        {
            return new Resultset<T>(dr.GetLong("total_rows"), GetData(dr));
        }

        public IObservable<T> Get(Int64 id)
        {
            var param = "@id".ToParam(DbType.Int64, id);

            var cmd = GetByIdSql.ToCmd(CommandType.Text, param);

            return Db.ExecuteDataReader(cmd, GetData);
        }

        public IObservable<Resultset<T>> Search(SearchData entity)
        {
            List<IDbDataParameter> parameters = new List<IDbDataParameter>();
            parameters.Add("@limit".ToParam(DbType.Int32, entity.Limit));
            parameters.Add("@offset".ToParam(DbType.Int32, entity.Offset));
            parameters.Add("@estado".ToParam(DbType.String, entity.Estado));
            parameters.Add("@ciudad".ToParam(DbType.Int64, entity.CiudadId));
            string whereClause = "";
            if (!string.IsNullOrWhiteSpace(entity.Pattern))
            {
                whereClause = "AND description like CONCAT('%', @search, '%')";
                parameters.Add("@search".ToParam(DbType.String, entity.Pattern));
            }
            if (entity.Columns == null || entity.Columns.Length == 0)
            {
                entity.Columns = new OrderCol[] { new OrderCol() { Col = "id", Order = Order.Asc } };
            }
            string orderby = string.Join(",",
            (from c in entity.Columns select c.ToString()).ToArray());

            var cmd = string.Format(SerchSql, whereClause, orderby).
            ToCmd(CommandType.Text, parameters.ToArray());

            return Db.ExecuteDataReader(cmd, GetResultSet);
        }

        public IObservable<int> Delete(Int64 id)
        {
            var param = "@id".ToParam(DbType.Int64, id);

            var cmd = DeleteSql.ToCmd(CommandType.Text, param);

            return Db.ExecuteNonQuery(cmd);
        }

        public IObservable<int> Update(T entity)
        {
            var parameters = ToUpdateParams(entity);
            var cmd = UpdateSql.ToCmd(CommandType.Text, parameters);
            return Db.ExecuteNonQuery(cmd);
        }

        public IObservable<int> Save(T entity)
        {
            var parameters = ToSaveParams(entity);
            var cmd = SaveSql.ToCmd(CommandType.Text, parameters);
            return Db.ExecuteNonQuery(cmd);
        }
    }
}

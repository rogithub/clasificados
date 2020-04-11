﻿using System.Data;
using Npgsql;
using System.Linq;

namespace ReactiveDb
{
    public static class CmdBuilderHelpers
    {
        public static IDbCommand ToCmd(this string sql, params IDbDataParameter[] commandParameters)
        {
            IDbCommand cmd = new NpgsqlCommand(sql);
            cmd.AddParams(commandParameters);
            return cmd;
        }
        public static IDbCommand ToCmd(this string sql, CommandType type, params IDbDataParameter[] commandParameters)
        {
            var cmd = ToCmd(sql, commandParameters);
            cmd.CommandType = type;
            return cmd;
        }
        public static IDbCommand ToCmd(this string sql, DbType type, object value, ParameterDirection direction = ParameterDirection.Input)
        {
            IDbCommand cmd = ToCmd(sql);
            var name = sql.Split(' ').FirstOrDefault(param => param.StartsWith("@"));
            cmd.AddParams(name.Trim(), type, value, direction);
            return cmd;
        }

        public static IDbDataParameter ToParam(this string name, DbType type, object value, ParameterDirection direction = ParameterDirection.Input)
        {
            IDbDataParameter param = new NpgsqlParameter(name, value)
            {
                DbType = type,
                Direction = direction
            };

            return param;
        }

        public static IDbCommand AddParams(this IDbCommand cmd, params IDbDataParameter[] commandParameters)
        {
            foreach (var p in commandParameters)
            {
                cmd.Parameters.Add(p);
            }
            return cmd;
        }

        public static IDbCommand AddParams(this IDbCommand cmd, string name, DbType type, object value, ParameterDirection direction = ParameterDirection.Input)
        {
            cmd.AddParams(name.ToParam(type, value, direction));
            return cmd;
        }
    }
}

using System;
using Newtonsoft.Json;

namespace Clasificados.Models
{
    public class Lugar
    {
        [JsonProperty(PropertyName = "estado")]
        public string Estado { get; set; }
        [JsonProperty(PropertyName = "ciudad")]
        public string Ciudad { get; set; }
    }
}

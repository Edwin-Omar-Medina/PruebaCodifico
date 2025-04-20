using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Sales_Date__Prediction_API.Models
{
    public class InsertOrderWithProduct
    {
        
        public int CustId { get; set; }

        public int EmpId { get; set; }

        [JsonPropertyName("orderdate")]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime OrderDate { get; set; }

        [JsonPropertyName("requireddate")]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime RequieredDate { get; set; }

        [JsonPropertyName("shippeddate")]
        [JsonConverter(typeof(JsonDateConverter))]
        public DateTime ShippedDate { get; set; }

        public int ShipperId { get; set; }

        public decimal Freight { get; set; }

        public string ShipName { get; set; } = string.Empty;

        public string ShipAddress { get; set; } = string.Empty;

        public string ShipCity { get; set; } = string.Empty;

        public string ShipCountry { get; set; } = string.Empty;

        // Detalles del producto

        public int ProductId { get; set; }

        public decimal UnitPrice { get; set; }

        public int Qty { get; set; }

        public decimal Discount { get; set; }
    }
}
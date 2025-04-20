using System;
using System.Collections.Generic;

namespace Sales_Date__Prediction_API.Models;

public partial class OrderValue
{
    public int Orderid { get; set; }

    public int? Custid { get; set; }

    public int Empid { get; set; }

    public int Shipperid { get; set; }

    public DateTime Orderdate { get; set; }

    public decimal? Val { get; set; }
}

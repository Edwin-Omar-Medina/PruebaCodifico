using System;
using System.Collections.Generic;

namespace Sales_Date__Prediction_API.Models;

public partial class CustomerOrder
{
    public int Orderid { get; set; }

    public int? Custid { get; set; }

    public DateTime Requireddate { get; set; }

    public DateTime? Shippeddate { get; set; }

    public string Shipname { get; set; } = null!;

    public string Shipaddress { get; set; } = null!;

    public string Shipcity { get; set; } = null!;
}

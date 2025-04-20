using System;
using System.Collections.Generic;

namespace Sales_Date__Prediction_API.Models;

public partial class NextPredictedOrder
{
    public string CustomerName { get; set; } = null!;

    public DateTime? LastOrderDate { get; set; }

    public DateTime? NextPredictedOrder1 { get; set; }
}

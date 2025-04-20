using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Sales_Date__Prediction_API.Models;
using System.Data;

namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public OrdersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST: api/Orders/InsertOrderWithDetails
        [HttpPost("InsertOrderWithDetails")]
        public async Task<IActionResult> InsertOrderWithDetails([FromBody] InsertOrderWithProduct input)
        {
            if (input == null)
            {
                return BadRequest("Datos inválidos.");
            }
            
            var minSqlDate = new DateTime(1753, 1, 1);
            
            if (input.OrderDate < minSqlDate || input.RequieredDate < minSqlDate || input.ShippedDate < minSqlDate)
            {
                return BadRequest("Las fechas deben ser mayores o iguales a 1753-01-01. fechaorden="+input.RequieredDate);
            }

            try
            {
                // Obtener la cadena de conexión desde appsettings.json
                var connectionString = _configuration.GetConnectionString("cadenaSQL");
                
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();

                    using (var command = new SqlCommand("Sales.InsertOrderWithProduct", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        
                        command.Parameters.AddWithValue("@custid", input.CustId);
                        command.Parameters.AddWithValue("@empid", input.EmpId);
                        command.Parameters.AddWithValue("@orderdate", input.OrderDate);
                        command.Parameters.AddWithValue("@requireddate", input.RequieredDate);
                        command.Parameters.AddWithValue("@shippeddate", input.ShippedDate);
                        command.Parameters.AddWithValue("@shipperid", input.ShipperId);
                        command.Parameters.AddWithValue("@freight", input.Freight);
                        command.Parameters.AddWithValue("@shipname", input.ShipName);
                        command.Parameters.AddWithValue("@shipaddress", input.ShipAddress);
                        command.Parameters.AddWithValue("@shipcity", input.ShipCity);
                        command.Parameters.AddWithValue("@shipcountry", input.ShipCountry);
                        command.Parameters.AddWithValue("@productid", input.ProductId);
                        command.Parameters.AddWithValue("@unitprice", input.UnitPrice);
                        command.Parameters.AddWithValue("@qty", input.Qty);
                        command.Parameters.AddWithValue("@discount", input.Discount);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                //return Ok("Orden insertada correctamente." );
                return Ok(new { message = "Orden insertada correctamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al insertar la orden: {ex.Message}");
            }
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Sales_Date__Prediction_API.Models;
using System.ComponentModel;

namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NextPredictedOrdersController : ControllerBase
    {

        public readonly StoreSampleContext _dbcontext;

        public NextPredictedOrdersController(StoreSampleContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("ListNextPredictedOrders")]
        public IActionResult ListNextPredictedOrders()
        {
            List<NextPredictedOrder> lista = new List<NextPredictedOrder>();

            try
            {
                lista = _dbcontext.NextPredictedOrders.ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }
                 
        }

        [HttpGet]
        [Route("GetNextPredictedOrders/{customerName}")]
        public IActionResult GetNextPredictedOrders(string customerName)
        {
            try
            {
                var matchingOrders = _dbcontext.NextPredictedOrders
                    .Where(o => o.CustomerName.ToLower().Contains(customerName.ToLower()))
                    .ToList();

                if (matchingOrders == null || matchingOrders.Count == 0)
                {
                    return NotFound(new { mensaje = "No se encontraron clientes con ese nombre" });
                }

                return Ok(new { mensaje = "ok", response = matchingOrders });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    mensaje = "Ocurrió un error",
                    error = ex.Message
                });
            }
        }
    }
}

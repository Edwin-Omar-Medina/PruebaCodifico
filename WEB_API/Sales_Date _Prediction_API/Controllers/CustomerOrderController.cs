using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Sales_Date__Prediction_API.Models;


namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerOrderController : ControllerBase
    {
        public readonly StoreSampleContext _dbcontext;

        public CustomerOrderController(StoreSampleContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("ListCustomerOrder")]
        public IActionResult ListCustomerOrder()
        {
            List<CustomerOrder> lista = new List<CustomerOrder>();

            try
            {
                lista = _dbcontext.CustomerOrders.ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }

        }


        [HttpGet]
        [Route("GetCustomerOrder/{companyname}")]
        public IActionResult GetCustomerOrder(String companyname)
        {
            try
            {
                var custId = _dbcontext.Customers
                    .Where(o => o.Companyname == companyname)
                    .Select(o => o.Custid)
                    .FirstOrDefault();

                if (custId == null)
                {
                    return NotFound(new { mensaje = "Cliente no encontrado" });
                }
                
                var customerOrders = _dbcontext.CustomerOrders.Where(o => o.Custid == custId).ToList();

                if (customerOrders == null || !customerOrders.Any())
                {
                    return NotFound(new { mensaje = "El cliente no tiene órdenes registradas" });
                }
                
                return Ok(new { mensaje = "ok", Response = customerOrders });
                
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

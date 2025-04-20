using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Sales_Date__Prediction_API.Models;
using System.ComponentModel;

namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotalProductController : ControllerBase
    {
        public readonly StoreSampleContext _dbcontext;

        public TotalProductController(StoreSampleContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("ListTotalProduct")]
        public IActionResult ListNextPredicListTotalProducttedOrders()
        {
            List<TotalProduct> lista = new List<TotalProduct>();

            try
            {
                lista = _dbcontext.TotalProducts.ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }

        }


        [HttpGet]
        [Route("GetListTotalProduct/{idproduct}")]
        public IActionResult GetNextPredictedOrders(int idproduct)
        {
            try
            {
                var matchingProduct = _dbcontext.Products.Where(o => o.Productid == idproduct).ToList();

                if (matchingProduct == null || matchingProduct.Count == 0)
                {
                    return NotFound(new { mensaje = "No se encontraron productos" });
                }

                return Ok(new { mensaje = "ok", response = matchingProduct });
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

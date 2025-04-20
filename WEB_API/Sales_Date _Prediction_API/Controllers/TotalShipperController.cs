using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Sales_Date__Prediction_API.Models;
using System.ComponentModel;

namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TotalShipperController : ControllerBase
    {
        public readonly StoreSampleContext _dbcontext;

        public TotalShipperController(StoreSampleContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("ListTotalShippers")]
        public IActionResult ListTotalShippers()
        {
            List<TotalShipper> lista = new List<TotalShipper>();

            try
            {
                lista = _dbcontext.TotalShippers.ToList();
                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }

        }
    }

    

}

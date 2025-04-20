using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using Sales_Date__Prediction_API.Models;
using System.ComponentModel;

namespace Sales_Date__Prediction_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {

        public readonly StoreSampleContext _dbcontext;

        public EmployeesController(StoreSampleContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        [Route("ListEmployees")]
        public IActionResult ListEmployees()
        {
            
            List<TotalEmployee> lista = new List<TotalEmployee>();

            try
            {
                lista = _dbcontext.TotalEmployees.ToList();

                return StatusCode(StatusCodes.Status200OK, new { mensaje = "ok", Response = lista });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status200OK, new { mensaje = ex.Message, Response = lista });
            }

        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataInfrastructure.Data;
using Domain.Entities;

namespace mf_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraGadoItemsController : ControllerBase
    {
        private readonly Contexto _context;

        public CompraGadoItemsController(Contexto context)
        {
            _context = context;
        }

        // GET: api/CompraGadoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompraGadoItem>>> GetCompraGadoItems()
        {
            return await _context.CompraGadoItems
                .Include(x => x.Animal)
                .ToListAsync();
        }

        // GET: api/CompraGadoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompraGadoItem>> GetCompraGadoItem(int id)
        {
            var compraGadoItem = await _context.CompraGadoItems.FindAsync(id);

            if (compraGadoItem == null)
            {
                return NotFound();
            }

            return compraGadoItem;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompraGadoItem(int id, CompraGadoItem compraGadoItem)
        {
            if (id != compraGadoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(compraGadoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompraGadoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<CompraGadoItem>> PostCompraGadoItem(CompraGadoItem compraGadoItem)
        {
            _context.CompraGadoItems.Add(compraGadoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompraGadoItem", new { id = compraGadoItem.Id }, compraGadoItem);
        }

        
        [HttpDelete("{id}")]
        public async Task<ActionResult<CompraGadoItem>> DeleteCompraGadoItem(int id)
        {
            var compraGadoItem = await _context.CompraGadoItems.FindAsync(id);
            if (compraGadoItem == null)
            {
                return NotFound();
            }

            _context.CompraGadoItems.Remove(compraGadoItem);
            await _context.SaveChangesAsync();

            return compraGadoItem;
        }

        private bool CompraGadoItemExists(int id)
        {
            return _context.CompraGadoItems.Any(e => e.Id == id);
        }
    }
}

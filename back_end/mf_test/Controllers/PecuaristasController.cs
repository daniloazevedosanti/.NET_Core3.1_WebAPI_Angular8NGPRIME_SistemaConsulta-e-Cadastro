using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataInfrastructure.Data;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mf_test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PecuaristasController : ControllerBase
    {
        private readonly Contexto _context;

        public PecuaristasController(Contexto context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Pecuarista>>> Get([FromServices] Contexto contexto)
        {
            try
            {
                var pecuarista = await contexto.Pecuaristas
                    .AsNoTracking()
                    .AsQueryable()
                    .Include(a => a.CompraGados)
                    .ToListAsync();
                return pecuarista;
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("nomes")]
        public async Task<ActionResult<List<Pecuarista>>> GetNomeId([FromServices] Contexto contexto)
        {
            try
            {
                var pecuarista = await contexto.Pecuaristas
                    .AsNoTracking()
                    .AsQueryable()
                    .ToListAsync();
                return pecuarista;
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        
        [HttpPost]
        public async Task<ActionResult<Pecuarista>> Post(
            [FromServices] Contexto context,
            [FromBody] Pecuarista model)
        {
            if (ModelState.IsValid)
            {
                context.Pecuaristas.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
                return BadRequest(ModelState);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Pecuarista>>> GetPecuarista(int id)
        {
            var pec = await _context.Pecuaristas
                .AsNoTracking()
                .AsQueryable()
                .Include(a => a.CompraGados)
                .Where(x => x.Id == id)
                 .ToListAsync();

            if (pec == null)
            {
                return NotFound();
            }

            return pec;
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<Pecuarista>> GetPecuaristaId(int id)
        {
            var pec = await _context.Pecuaristas
                .FindAsync(id);

            if (pec == null)
            {
                return NotFound();
            }

            return pec;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutPecurista(int id, Pecuarista pecuarista)
        {
            if (id != pecuarista.Id)
            {
                return BadRequest();
            }

            _context.Entry(pecuarista).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PecuaristaExists(id))
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


        [HttpDelete("{id}")]
        public async Task<ActionResult<Pecuarista>> DeletePecurista(int id)
        {
            var pecuarista = await _context.Pecuaristas.FindAsync(id);
            if (pecuarista == null)
            {
                return NotFound();
            }

            _context.Pecuaristas.Remove(pecuarista);
            await _context.SaveChangesAsync();

            return pecuarista;
        }


        private bool PecuaristaExists(int id)
        {
            return _context.Pecuaristas.Any(e => e.Id == id);
        }


    }
}

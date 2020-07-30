using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using asp_react_demo.Models;

namespace asp_react_demo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DPlayersController : ControllerBase
    {
        private readonly DBContext _context;

        public DPlayersController(DBContext context)
        {
            _context = context;
        }

        // GET: api/DPlayers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DPlayer>>> GetDPlayers()
        {
            return await _context.DPlayers.ToListAsync();
        }

        // GET: api/DPlayers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DPlayer>> GetDPlayer(int id)
        {
            var dPlayer = await _context.DPlayers.FindAsync(id);

            if (dPlayer == null)
            {
                return NotFound();
            }

            return dPlayer;
        }

        // PUT: api/DPlayers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDPlayer(int id, DPlayer dPlayer)
        {
            dPlayer.playerID = id;

           _context.Entry(dPlayer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DPlayerExists(id))
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

        // POST: api/DPlayers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DPlayer>> PostDPlayer(DPlayer dPlayer)
        {
            _context.DPlayers.Add(dPlayer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDPlayer", new { id = dPlayer.playerID }, dPlayer);
        }

        // DELETE: api/DPlayers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DPlayer>> DeleteDPlayer(int id)
        {
            var dPlayer = await _context.DPlayers.FindAsync(id);
            if (dPlayer == null)
            {
                return NotFound();
            }

            _context.DPlayers.Remove(dPlayer);
            await _context.SaveChangesAsync();

            return dPlayer;
        }

        private bool DPlayerExists(int id)
        {
            return _context.DPlayers.Any(e => e.playerID == id);
        }
    }
}

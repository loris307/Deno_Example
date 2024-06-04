import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";


const port = 8080;
const app = new Application();
const router = new Router();


const messages = [
  { id: 1, text: "Diese Nachricht kommt vom Server" },
  { id: 2, text: "Diese Hier auch!" },
  { id: 3, text: "DIE NICHT (nein spaß, die auch)" }
];


router
  .get('/get-messages', (context) => {
    const html = messages.map(m => `<div>${m.text}</div>`).join('');
    context.response.body = html;
  })
  .post('/add-messages', async (context) => {
    const body = await context.request.body({ type: 'json' }).value;
    const message = body.message;
    const newMessage = { id: messages.length + 1, text: message};
    messages.push(newMessage);
    const html = messages.map(m => `<div>${m.text}</div>`).join('');
    context.response.body = html;
  })
  
  .delete('/delete-last-message', (context) => {
    if (messages.length > 0) {
      messages.pop();
      const html = messages.map(m => `<div>${m.text}</div>`).join('');
      context.response.body = html;
    } else {
      context.response.status = 404;
      context.response.body = 'Keine Nachrichten zum Löschen vorhanden';
    }
  });



app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());


console.log(`Server läuft auf http://localhost:${port}`);
await app.listen({ port });

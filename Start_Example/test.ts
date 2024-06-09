const decoder = new TextDecoder('utf-8');

async function readFile() {
    const data = await Deno.readFile('auslesen.txt');
    console.log(decoder.decode(data));
}

readFile();



const encoder = new TextEncoder();


async function writeFile() {
    const text = encoder.encode('hey, was geht?');
    await Deno.writeFile('readme.txt', text);
    console.log('Successfully wrote to file.');
}

writeFile();

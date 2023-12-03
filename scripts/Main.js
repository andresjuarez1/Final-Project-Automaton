// de Editor.js
loadEditor()

async function start(code_as_array) {

    const auto = new Automata(
        parseInt(document.getElementById('speed').value),
        code_as_array,
        stack,
        out
    )

    auto.load().then(() => {
        auto.start()
    })

}
class Chomp {

    /** @type {Array[Array[string]]} */
    tokens

    /** @type {HTMLUListElement} */
    stack_list

    /** @type {HTMLUListElement} */
    output_stack

    delay_time_in_ms = 10

    current_structure = null
    current_reference = null

    typo_required = undefined

    grammar = {
        variable_declaration: {
            V: [
                { reg: /^string$/, next: "C1", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'string' },
                { reg: /^num$/, next: "C1", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'num' },
                { reg: /^float$/, next: "C1", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'float' }
            ],
            C1: [
                {
                    reg: /^[^0-9][a-zA-Z0-9]*$/,
                    next: "C3",
                    msg: "coincide con caracteres alfanuméricos que no comiencen con un número."
                }
            ],
            C3: [
                { reg: /^=$/, next: "C4", msg: "coincide con el carácter '='" },
                { reg: /;$/, next: "C13", msg: "coincide " }
            ],

            C13: [
                { next: null, scopable: true, msg: "variable finalizada" }
            ],

            C4: [
                {
                    reg: /^[0-9]*$/, next: "C5", msg: "coincide en uno o más dígitos numéricos",
                    given: 'num'
                },
                {
                    reg: /^"$/, next: "C6", msg: "coincide con el carácter '\"'",
                    given: 'string'
                },
                {
                    reg: /^(?!.*\.\.)(?!^\.)\d+(\.\d+)?$/, next: "C5", msg: "coincide en uno o más dígitos numéricos",
                    given: 'float'
                }
            ],
            C5: [
                { reg: /^;$/, next: null, msg: "coincide con el carácter ';'" }
            ],
            C6: [
                { reg: /^[a-zA-Z0-9]*$/, next: "C7", msg: "cualquier combinación de caracteres alfanuméricos" }
            ],
            C7: [
                { reg: /^"$/, next: "C8", msg: "coincide con el carácter '\"'" },
                { reg: /^[a-zA-Z0-9]*$/, next: "C7", msg: "cualquier combinación de caracteres alfanuméricos" }
            ],
            C8: [
                { reg: /^;$/, next: null, msg: "coincide con el carácter ';'" }
            ]
        },
        function_declaration: {
            FUNC: [
                { reg: /^function$/, next: "FUN1", msg: "coincide con la palabra reservada fn" }
            ],
            FUN1: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "FUN2", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." }
            ],
            FUN2: [
                { reg: /^\($/, next: "FUN3", msg: "coincide con el carácter '('", wanted: '(' }
            ],
            FUN3: [
                { reg: /^string$/, next: "FUN4", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'string' },
                { reg: /^num$/, next: "FUN4", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'num' },
                { reg: /^float$/, next: "FUN4", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'float' },
            ],
            FUN4: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "FUN5", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." }
            ],
            FUN5: [
                { reg: /^,*$/, next: "FUN6", msg: "coincide con ','", wanted: ',' }
            ],
            FUN6: [
                { reg: /^string$/, next: "FUN7", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'string' },
                { reg: /^num$/, next: "FUN7", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'num' },
                { reg: /^float$/, next: "FUN7", msg: "coincide con los tipos de datos permitido: string | num | float ", wanted: 'float' },
            ],
            FUN7: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "FUN8", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." }
            ],
            FUN8: [
                { reg: /^\)$/, next: "FUN9", msg: "coincide con el carácter '('", wanted: '(' }
            ],

            FUN9: [
                { reg: /^{$/, next: "FUN10", msg: "coincide con el carácter '{'", wanted: '{' },
            ],
            FUN10: [
                { reg: /^}$/, next: null, scopable: true, msg: "coincide con el carácter '}'", wanted: '{' },
            ]
        },

        conditional_declaration: {
            IFG: [
                { reg: /^if$/, next: "I1", msg: "coincide con la palabra reservada 'if'" },
            ],
            I1: [
                { reg: /^\($/, next: "I2", msg: "coincide con el carácter '('", wanted: '(' }
            ],
            I2: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "COND", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." },
            ],
            COND: [
                { reg: /^\>$/, next: "I2" },
                { reg: /^\<$/, next: "I2" },
                { reg: /^\=\=$/, next: "I2" },
                { reg: /^\>\=$/, next: "I2" },
                { reg: /^\=\<$/, next: "I2" },
            ],
            I3: [
                { reg: /^(?!.*\.\.)(?!^\.)\d+(\.\d+)?$/, next: "I4", msg: "coincide en uno o más dígitos numéricos" },
            ],
            I4: [
                { reg: /^\)$/, next: "I5", msg: "coincide con el carácter ')'", wanted: ')' }
            ],
            I5: [
                { reg: /^{$/, next: "I6", msg: "coincide con el carácter '{'", wanted: '{' },
            ],
            I6: [
                { reg: /^else$/, next: "I7 ", msg: "coincide con la palabra reservada 'if'" },
            ],
            I7: [
                { reg: /^{$/, next: "I8", msg: "coincide con el carácter '{'", wanted: '{' },
            ],
            I8: [
                { reg: /^}$/, next: null, scopable: true, msg: "coincide con el carácter '}'", wanted: '{' },
            ]
        },
        for_loop: {
            FOR: [
                { reg: /^for$/, next: "F1", msg: "coincide con la palabra reservada 'for'" },
            ],
            F1: [
                { reg: /^\($/, next: "F2", msg: "coincide con el carácter '('", wanted: '(' },
            ],
            F2: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "F3", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." },
            ],
            F3: [
                { reg: /^=$/, next: "F4", msg: "coincide con el carácter '='." },
            ],
            F4: [
                { reg: /^(?!.*\.\.)(?!^\.)\d+(\.\d+)?$/, next: "F5", msg: "coincide en uno o más dígitos numéricos" },
            ],
            F5: [
                { reg: /^;$/, next: "F6", msg: "coincide con el carácter ';'." },
            ],
            F6: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "F7", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." },
            ],
            F7: [
                { reg: /^\>$/, next: "F8" },
                { reg: /^\<$/, next: "F8" },
                { reg: /^\=\=$/, next: "F8" },
                { reg: /^\>\=$/, next: "F8" },
                { reg: /^\=\<$/, next: "F8" },
                { reg: /^!\=$/, next: "F8" },
            ],
            F8: [
                { reg: /^(?!.*\.\.)(?!^\.)\d+(\.\d+)?$/, next: "F9", msg: "coincide en uno o más dígitos numéricos" },
            ],
            F9: [
                { reg: /^--$/, next: "F10", msg: "coincide con caracteres de incremento: ++ | --." },
                { reg: /^\+\+$/, next: "F10", msg: "coincide con caracteres de incremento: ++ | --." },
            ],
            F10: [
                { reg: /^\)$/, next: "F11", msg: "coincide con el carácter ')'." },
            ],
            F11: [
                { reg: /^{$/, next: "F12", msg: "coincide con el carácter '{'", wanted: '{' },
            ],
            F12: [
                { reg: /^}$/, next: null, scopable: true, msg: "coincide con el carácter '}'", wanted: '}' },
            ]
        },

        while_loop: {
            WH: [
                { reg: /^while$/, next: "W1", msg: "coincide con la palabra reservada 'while'" },
            ],
            W1: [
                { reg: /^\($/, next: "W2", msg: "coincide con el carácter '('", wanted: '(' },
            ],
            W2: [
                { reg: /^[^0-9][a-zA-Z0-9]*$/, next: "W3", msg: "coincide con caracteres alfanuméricos que no comiencen con un número." },
            ],
            W3: [
                { reg: /^\>$/, next: "W4" },
                { reg: /^\<$/, next: "W4" },
                { reg: /^\=\=$/, next: "W4" },
                { reg: /^\>\=$/, next: "W4" },
                { reg: /^\=\<$/, next: "W4" },
                { reg: /^!\=$/, next: "W4" },
            ],
            W4: [
                { reg: /^(?!.*\.\.)(?!^\.)\d+(\.\d+)?$/, next: "W5", msg: "coincide en uno o más dígitos numéricos" },
            ],
            W5: [
                { reg: /^\)$/, next: "W6", msg: "coincide con el carácter ')'." },
            ],
            W6: [
                { reg: /^{$/, next: "W7", msg: "coincide con el carácter '{'", wanted: '{' },
            ],
            W7: [
                { reg: /^}$/, next: null, scopable: true, msg: "coincide con el carácter '}'", wanted: '}' },
            ]
        }
    }

    scope = [[]]

    constructor(tokens, stack_list, output_stack) {
        this.tokens = tokens
        this.stack_list = stack_list
        this.output_stack = output_stack
    }

    async start_stream() {
        let is_all_right = true

        for (let line_number = 0; line_number < this.tokens.length; line_number++) {

            for (let token_number = 0; token_number < this.tokens[line_number].length; token_number++) {

                stack.firstChild.classList.add("active")

                if (!this.verify_token(this.tokens[line_number][token_number], line_number + 1)) {
                    is_all_right = false
                    this.stack_list.firstChild.classList.add("error");
                    break
                }

                await this.sleep()
                stack.firstChild.remove()
            }

            if (!is_all_right) {
                return
            }
        }

        const bubble = document.createElement('li')
        if (this.scope.length > 1) {
            bubble.classList.add('error')
            bubble.innerHTML = `<strong>Error</strong>: Carácteres "}" faltantes.`
        } else {
            bubble.classList.add('success')
            bubble.innerHTML = `<strong>¡Enhorabuena!</strong>: Tu código está bien escrito.`
        }
        this.output_stack.appendChild(bubble)
        this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
    }

    sleep() {
        return new Promise(resolve => setTimeout(resolve, this.delay_time_in_ms))
    }

    verify_token(token, line) {
        if (this.current_reference === null || this.current_structure === null) {
            if (!this.recognize_structure(token, line)) {
                return false
            }
            return true
        }

        if (!this.recognize_alternative(token, line)) {
            return false
        }

        return true
    }

    recognize_structure(token, line) {
        if (token === '}') {
            let res = true
            this.scope.pop()

            const bubble = document.createElement('li')

            if (this.scope.length === 0) {
                bubble.classList.add('error')
                bubble.innerHTML = `<strong>Error en la línea ${line}:</strong> Carácter '}' inesperado.`
                res = false
            } else {
                bubble.innerHTML = `<strong>Saliendo</strong> de un scope en la línea ${line}.`
            }
            this.output_stack.appendChild(bubble)
            this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
            return res
        }

        for (let key_index = 0; key_index < Object.keys(this.grammar).length; key_index++) {
            const structure_in_revision = this.grammar[Object.keys(this.grammar)[key_index]];
            const first_key = Object.keys(structure_in_revision)[0]
            const rules = structure_in_revision[first_key]

            for (let rule_count = 0; rule_count < rules.length; rule_count++) {
                if (rules[rule_count].reg.test(token)) {
                    this.current_structure = Object.keys(this.grammar)[key_index]
                    this.current_reference = this.grammar[this.current_structure][first_key][rule_count].next
                    if (this.grammar[this.current_structure][first_key][rule_count].wanted) {
                        this.typo_required = this.grammar[this.current_structure][first_key][rule_count].wanted
                    }
                    const bubble = document.createElement('li')
                    bubble.classList.add('info')
                    bubble.innerHTML = `Estructura reconocida en la línea ${line}: <strong>${this.current_structure}</strong>`
                    this.output_stack.appendChild(bubble)

                    const bubblee = document.createElement('li')
                    bubblee.classList.add('reg')
                    bubblee.innerHTML = `[ <strong>${token}</strong> ] = <strong>${first_key}</strong> &#10140; <em>${rules[rule_count].reg} </em> &#10140; <strong>${this.current_reference}</strong>`
                    this.output_stack.appendChild(bubblee)
                    this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
                    this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
                    return true
                }
            }
        }

        const bubble = document.createElement('li')
        bubble.classList.add('error')
        bubble.innerHTML = `<strong>Error en la línea ${line}</strong>: No se pudo reconocer ninguna estrutura.`
        this.output_stack.appendChild(bubble)
        this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
        return false
    }

    recognize_alternative(token, line) {
        const alternatives = this.grammar[this.current_structure][this.current_reference]
        for (let option = 0; option < alternatives.length; option++) {
            if (alternatives[option].reg.test(token)) {
                let actual = this.current_reference
                this.current_reference = alternatives[option].next
                if (alternatives[option].wanted) {
                    this.typo_required = alternatives[option].wanted
                }
                if (this.typo_required && alternatives[option].given && (alternatives[option].given !== this.typo_required)) {
                    const bubble = document.createElement('li')
                    bubble.classList.add('warn')
                    bubble.innerHTML = `<strong>Alerta de tipado en la línea ${line}</strong>: Tu declaración actual requiere un valor de tipo <strong>${this.typo_required}</strong> y el valor dado es de tipo <strong>${alternatives[option].given}</strong>`;
                    this.typo_required = null
                    this.output_stack.appendChild(bubble)
                    this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
                }
                if (alternatives[option].scopable) {
                    const bubble = document.createElement('li')
                    bubble.innerHTML = `<strong>Ingresando</strong> a un nuevo scope en la línea ${line}.`
                    this.output_stack.appendChild(bubble)
                    this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
                    this.scope.push([])
                }
                const bubble = document.createElement('li')
                bubble.classList.add('reg')
                bubble.innerHTML = `[ <strong>${token}</strong> ] = <strong>${actual}</strong> &#10140; <em>${alternatives[option].reg} </em> &#10140; <strong>${this.current_reference}</strong>`
                this.output_stack.appendChild(bubble)
                this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
                return true
            }
        }
        const bubble = document.createElement('li')
        bubble.classList.add('error')
        bubble.innerHTML = `<strong>Error en la línea ${line}</strong>: La entrada no ${this.grammar[this.current_structure][this.current_reference][0]["msg"]}`
        console.log(this.grammar[this.current_structure][this.current_reference][0])
        this.output_stack.appendChild(bubble)
        this.output_stack.parentNode.scrollTop = this.output_stack.parentNode.scrollHeight;
        return false
    }

    verify_scopable(token) {

    }
}
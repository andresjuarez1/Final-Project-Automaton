class Automata {

    grammar = {
        variable: {
            S: {
                next: [
                    ["VAR", "C1"],
                    ["VAR1", "C1"],
                    ["VAR2", "C1"],
                    ["I", "I1"],
                    ["W", "W1"],
                    ["FO", "F1"],
                    ["F", "FUN1"],
                ],
                reg: null,
                treat_as_word: true,
            },
            //--------------------------VARIABLES----------------------
            VAR: {
                next: [],
                reg: /^string$/,
                treat_as_word: true
            },
            VAR1: {
                next: [],
                reg: /^num$/,
                treat_as_word: true
            },
            VAR2: {
                next: [],
                reg: /^float$/,
                treat_as_word: true
            },

            C1: {
                next: [
                    ["L", "C3"]
                ],
                reg: null,
                treat_as_word: true
            },
            C3: {
                next: [
                    ["IG", "C4"],
                    ["C13"]
                ],
                reg: null,
                treat_as_word: true
            },
            C13: {
                next: [
                    ["PYC"]
                ],
                reg: null,
                treat_as_word: true
            },
            C4: {
                next: [
                    ["D", "C5"],
                    ["C", "C9"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            C5: {
                next: [
                    ["D", "C6"],
                    ["D", "C13"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            C6: {
                next: [
                    ["P", "C7"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            C7: {
                next: [
                    ["D", "C8"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            C8: {
                next: [
                    ["C13"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            C9: {
                next: [
                    ["L", "C12"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            C12: {
                next: [
                    ["C", "C13"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            RL: {
                next: [
                    ["L", "RL"],
                    [null]
                ],
                reg: null,
                treat_as_word: false
            },
            L: {
                next: [],
                reg: /^[a-zA-Z]$/,
                treat_as_word: false
            },
            RD: {
                next: [
                    ["D", "RD"],
                    [null]
                ],
                reg: null,
                treat_as_word: true
            },
            D: {
                next: [],
                reg: /^[0-9]$/,
                treat_as_word: false
            },
            IG: {
                next: [],
                reg: /^=$/,
                treat_as_word: false
            },
            P: {
                next: [],
                reg: /^.$/,
                treat_as_word: false
            },
            PYC: {
                next: [],
                reg: /^;$/,
                treat_as_word: true,
                last_transition: true
            },
            //--------------------------VARIABLES----------------------

            //--------------------------IF-------------------------------
            I1: {
                next: [
                    ["PAR1", "I2"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I2: {
                next: [
                    ["L", "I4"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I4: {
                next: [
                    ["COND", "I5"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I5: {
                next: [
                    ["D", "I6"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I6: {
                next: [
                    ["PAR2", "I7"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I7: {
                next: [
                    ["CORA", "I8"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I8: {
                next: [
                    ["CORC", "I9"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I9: {
                next: [
                    ["EL", "I10"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I10: {
                next: [
                    ["CORA", "I11"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            I11: {
                next: [
                    ["CORC"],
                ],
                "reg": null,
                "treat_as_word": true
            },

            I: {
                next: [],
                reg: /^if$/,
                treat_as_word: true
            },
            PAR1: {
                next: [],
                reg: /^\($/,
                treat_as_word: true
            },
            PAR2: {
                next: [],
                reg: /^\)$/,
                treat_as_word: true
            },
            COND: {
                next: [],
                reg: /^(>|<|==|!=)$/,
                treat_as_word: true
            },
            CORA: {
                next: [],
                reg: /^{$/,
                treat_as_word: true
            },
            CORC: {
                next: [],
                reg: /^}$/,
                treat_as_word: true
            },
            EL: {
                next: [],
                reg: /^else$/,
                treat_as_word: true
            },
            //--------------------------IF-------------------------------

            //---------------------------WHILE-----------------------------
            W: {
                next: [],
                reg: /^while$/,
                treat_as_word: true
            },
            W1: {
                next: [
                    ["PARA1", "W2"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W2: {
                next: [
                    ["L", "W4"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W4: {
                next: [
                    ["COND", "W5"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W5: {
                next: [
                    ["D", "W7"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W7: {
                next: [
                    ["PAR2", "W8"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W8: {
                next: [
                    ["CORA", "W9"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            W9: {
                next: [
                    ["CORC"],
                ],
                "reg": null,
                "treat_as_word": true
            },

            //---------------------------FOR-----------------------------
            FO: {
                next: [],
                reg: /^for$/,
                treat_as_word: true
            },
            F1: {
                next: [
                    ["PARA1", "F2"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F2: {
                next: [
                    ["L", "F4"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F4: {
                next: [
                    ["IG", "F5"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F5: {
                next: [
                    ["D", "F7"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F7: {
                next: [
                    ["PYC", "F8"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F8: {
                next: [
                    ["L", "F10"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F10: {
                next: [
                    ["COND", "F11"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F11: {
                next: [
                    ["L", "F13"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F13: {
                next: [
                    ["MAS", "F14"],
                    ["MEN", "F14"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            F14: {
                next: [
                    ["PAR2", "F15"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F15: {
                next: [
                    ["CORA", "F15"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            F15: {
                next: [
                    ["CORC"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            //---------------------------FOR----------------------------- 

            //---------------------------FUNCTION----------------------------- 
            F: {
                next: [],
                reg: /^function$/,
                treat_as_word: true
            },
            FUN1: {
                next: [
                    ["L", "FUN2"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN3: {
                next: [
                    ["PAR1", "FUN4"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN4: {
                next: [
                    ["L", "FUN6"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN6: {
                next: [
                    ["VAR", "FUN7"],
                    ["VAR1", "FUN7"],
                    ["VAR2", "FUN7"],                
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN7: {
                next: [
                    ["CS", "FUN8"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN8: {
                next: [
                    ["L", "FUN10"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN10: {
                next: [
                    ["VAR", "FUN11"],
                    ["VAR1", "FUN11"],
                    ["VAR2", "FUN11"],  
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN11: {
                next: [
                    ["PAR2", "FUN12"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN12: {
                next: [
                    ["DP", "FUN13"]
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN13: {
                next: [
                    ["VAR", "FUN14"],
                    ["VAR1", "FUN14"],
                    ["VAR2", "FUN14"],  
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN14: {
                next: [
                    ["CORA", "FUN15"],
                ],
                "reg": null,
                "treat_as_word": true
            },
            FUN15: {
                next: [
                    ["CORA"],
                ],
                "reg": null,
                "treat_as_word": true
            },

            CS: {
                next: [],
                reg: /^,$/,
                treat_as_word: true
            },
            DP: {
                next: [],
                reg: /^:$/,
                treat_as_word: true
            },

            //---------------------------FUNCTION----------------------------- 
        },

    }

    current_rule_group_index = -1
    current_structure_key = null
    current_state = null
    current_rule = [] // Stack con la regla actual
    tokens = [[]] // Código pasado a palabras: fn algo => ["fn", "algo"].
    max_recursive_functions_call = 500
    still_validating = false
    scope = []

    /**
     * 
     * @param {number} delay_between_iteration 
     * @param {Array<string>} code_as_array 
     * @param {HTMLUListElement} visual_input_stack 
     * @param {HTMLUListElement} visual_output_stack 
     */
    constructor(
        delay_between_iteration,
        code_as_array,
        visual_input_stack,
        visual_output_stack
    ) {
        this.delay_between_iteration = delay_between_iteration || 100;
        this.code_as_array = code_as_array;
        this.visual_input_stack = visual_input_stack;
        this.visual_output_stack = visual_output_stack;
    }

    async load_gramar() {
        await fetch('scripts/gramar.json').then(response => response.json())
            .then(data => {
                this.grammar = data
            })
            .catch(error => {
                console.error('Error al obtener el archivo JSON:', error);
            });
    }

    async load() {
        this.visual_input_stack.innerHTML = ''
        this.visual_output_stack.innerHTML = ''
        this.tokens = []
        this.current_structure_key = null
        await this.load_gramar()

        for (let line_number = 0; line_number < this.code_as_array.length; line_number++) {
            this.tokens.push(
                this.code_as_array[line_number]
                    .replace(/\s+/g, ' ')
                    .replace(/(:|{|}|,|\(|\)|;|>|<|==|!=|\+\+|--|")/g, ' $1 ') // Los símbolos como :, =, ", etc. les añade espacio al final y al frente,Ejemplo -> num: algo: "alga" => num : algo " alga "
                    .replace(/\s+/g, ' ')
                    .trim()
                    .split(" ")
                    .filter((token) => token !== "")
            )
        }

        for (let line_number = 0; line_number < this.tokens.length; line_number++) {
            for (let token_number = 0; token_number < this.tokens[line_number].length; token_number++) {

                const current_token = document.createElement("li")
                current_token.textContent = this.tokens[line_number][token_number]

                stack.appendChild(current_token)
            }
        }
    }

    async start() {
        while (this.tokens.length > 0) {
            while (this.tokens[0].length > 0) {
                await this.__analize_token(this.tokens[0].shift())
                await this.__wait()
            }
            this.tokens.shift()
        }
        if (this.scope.length > 0) {
            throw new Error("Missing } characters.")
        }
        if (this.current_rule.length) {
            throw new Error("Se esparaban más carácteres.")
        }
        this.__add_output_stack('success', "Código correcto!")
    }

    __wait() {
        return new Promise(resolve => setTimeout(resolve, this.delay_between_iteration))
    }

    async __analize_token(token) {

        if (token === '}') {
            if (this.scope.length < 1) {
                throw new Error("Character } unexpected")
            }

            this.scope.pop()
            return
        }

        if (!this.current_structure_key) {
            this.__recognize_structure(token)
        }

        await this.__navigate_into_grammar(token)
        console.log(this.grammar.variable.S.next)
    }

    async __navigate_into_grammar(token) {
        console.log(JSON.stringify(this.current_rule))



        if (this.current_rule.length < 1) {
            throw new Error("Este es un error porque aun no sé que hacer en esta parte \n Array de reglas vacías")
        }

        const current_group_of_rule = this.current_rule[this.current_rule.length - 1][0]
        const first_rule_under_review = this.grammar[this.current_structure_key][current_group_of_rule[0]]

        if (!first_rule_under_review.reg) {
            this.current_rule.push(first_rule_under_review.next)
            this.tokens[0].unshift(token)
            return
            throw new Error("Este es un error porque aun no sé que hacer en esta parte \n No tiene expresion regular, no es terminal pues")
        }

        if (!first_rule_under_review.treat_as_word) {
            console.log(`No Entró: ${token} - ${first_rule_under_review.reg} | ${current_group_of_rule[0]}`)
            if (this.__char_by_char_analizer(token.split(""))) {
                this.current_rule[this.current_rule.length - 1][0] = JSON.parse(JSON.stringify(this.current_rule[this.current_rule.length - 1][0]));
                this.current_rule[this.current_rule.length - 1][0].shift();
            }
            return
        }

        if (RegExp(first_rule_under_review.reg).test(token)) {
            console.log(`Entró: ${token} - ${first_rule_under_review.reg} | ${current_group_of_rule[0]}`)
            current_group_of_rule.shift()
            if (first_rule_under_review.last_transition) {
                this.current_rule_group_index = -1
                this.current_structure_key = null
                this.current_state = null
                this.current_rule = []
                if (first_rule_under_review.scopable) {
                    this.scope.push("a")
                }
                await this.load_gramar()
                return
            }
        } else {
            throw new Error("Carácter inválido: " + token)
        }

    }

    __char_by_char_analizer(token_as_array) {

        let can_i_remove = false
        let is_validate = false
        this.max_recursive_functions_call--

        const current_char = token_as_array[0]
        token_as_array.shift()

        console.log(JSON.stringify(this.current_rule))
        const first_key_to_check = this.current_rule[this.current_rule.length - 1]
        for (let alternatives = 0; alternatives < this.current_rule[this.current_rule.length - 1].length; alternatives++) {
            const key_to_search_into_grammar = first_key_to_check[alternatives][0];

            if (key_to_search_into_grammar === null) {
                if (token_as_array.length === 0 && current_char === undefined) {
                    this.current_rule.pop()
                    return true
                }
                throw new Error(`Unexpected char ${current_char}`)
            }

            const rule = this.grammar[this.current_structure_key][key_to_search_into_grammar]

            if (!rule.reg) {
                this.current_rule.push(
                    rule.next
                )
                token_as_array.unshift(current_char)
                is_validate = true
                break;
            }


            if (RegExp(rule.reg).test(current_char)) {
                let copy = [...first_key_to_check[alternatives]]
                copy.shift()
                let new_rule = copy

                this.current_rule[this.current_rule.length - 1] = [new_rule]
                can_i_remove = true
                is_validate = true
            }
        }

        if (!is_validate) {
            console.error(first_key_to_check)
            throw new Error("Illega character: " + current_char)
        }


        if (this.max_recursive_functions_call <= 0) {
            console.warn("Este es un error totalmente intencionado. Este lexer usa recursividad para evaluar el nombre de carácteres, cuando se excede el número máximo de llamadas permitido, arroja el siguiente error.")
            throw new Error("Doup! We almost died. \nThis error appears when a variable name is too large and exceeds the total number of allowed references. \nYou can set the number called in the 'max_recursive_functions_call' property.")
        }

        if (this.__char_by_char_analizer(token_as_array)) {
            if (can_i_remove) {
                this.current_rule.pop()
            }
            console.log(JSON.stringify(this.current_rule))
            return true
        }
    }

    /**
     * Valida el primer token entre las primeras transiciones de la gramática hasta encontrar
     * el primero que satisfaga con la regla.
     * @param {string} token 
     */
    __recognize_structure(token) {
        let temporal_register = [];

        for (let structure_index = 0; structure_index < Object.keys(this.grammar).length; structure_index++) {
            const structure_under_review = { ...this.grammar[Object.keys(this.grammar)[structure_index]] };
            const initial_state = Object.keys(structure_under_review)[0];

            if (!structure_under_review[initial_state].reg && structure_under_review[initial_state].next.length === 0) {
                console.warn(`La estructura "${Object.keys(this.grammar)[structure_index]}" no contiene referencias a otros nodos o una expresión regular para evaluar.\n\nOmitiendo.`);
                continue;
            }
            if (structure_under_review[initial_state].next) {
                const alternatives = [...structure_under_review[initial_state].next];

                for (let alternative_index = 0; alternative_index < alternatives.length; alternative_index++) {
                    temporal_register = [...alternatives[alternative_index]];
                    if (this.__validate_first_transition(temporal_register, structure_under_review, token)) {
                        this.current_structure_key = Object.keys(this.grammar)[structure_index];
                        this.current_rule.push([temporal_register]);
                        this.current_rule_group_index = 0;
                        this.current_state = initial_state;

                        this.__add_output_stack('info', 'Nueva estructura localizada: ' + this.current_structure_key);
                        this.__add_output_stack('reg', `Inicial: ${this.current_state} => ${this.current_rule.map((item) => { return item })}`);
                    }
                }
            }
        }

        if (!this.current_structure_key) {
            throw new Error("No se pudo encontrar una estructura válida para este token: " + token);
        }
    }

    /**
     * Valida la primera referencia del registro dado.
     * @param {Array<string>} registers 
     */
    __validate_first_transition(registers, structure, token) {
        const currentTransition = { ...structure[registers[0]] };
        if (!currentTransition.reg) {
            console.warn(`Esta estructura no contiene una expresión que evaluar.\nOmitiendo por ahora.\nTransición: ${registers[0]}`);
            return false;
        }
        console.log(RegExp(currentTransition.reg))
        if (RegExp(currentTransition.reg).test(token)) {
            return { ...currentTransition };
        }
    }

    __add_output_stack(className, message) {
        const element_to_add = document.createElement('li')
        element_to_add.classList.add(className)
        element_to_add.textContent = message
        this.visual_output_stack.appendChild(element_to_add)
        this.visual_output_stack.parentNode.scrollTop = this.visual_output_stack.parentNode.scrollHeight;
    }

    __update_first_element_stack_input() {

        this.visual_input_stack.firstChild.classList.add('active')
    }

    __remove_first_element_stack_input() {
        this.visual_input_stack.firstChild.remove()
    }
}
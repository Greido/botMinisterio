const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowAyuda = addKeyword(['Ayuda', 'ayuda', 'ayudaaa']).addAnswer(
    [
        'En que area del Ministerio estas?',
        
        /*'\n*2* Para siguiente paso.',*/
    ],
    null,
    null,
    [flowSecundario]
)




const flowPulpo = addKeyword(['pulpo', 'mancha']).addAnswer(
    [
        '¿Para que area necesitas?',
        
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 gracias hacen los monos! Si queres donar unas media lunas, te lo vamos a agredecer!',
        //'[*opencollective*] https://opencollective.com/bot-whatsapp',
        //'[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        //'[*patreon*] https://www.patreon.com/leifermendez',
        //'\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowSistema = addKeyword(['Sistema', 'funka' ]).addAnswer(
    ['🤪 Lo resolveremos en breve', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo','holiii', 'holis','Man'])
    .addAnswer(' Buen dia!!! Mi nombre es *Pedrito HelpDesk* ingeniero en casi todo')
    .addAnswer(
        [
            'Escribe alguna de las opciones resaltadas',
            '👉 *Ayudaaaa*  para asistencia tecnica',
            '👉 *Este pulpo ya no mancha...* para solicitar tinta o toner para impresora',
            '👉 *No me funka el Sistema* por problemas con el sistema de expedientes',
            
        ],
        null,
        null,
        [flowAyuda, flowGracias, flowPulpo, flowSistema]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

const scraper = require('./modules/scraper');
const mailer = require('./modules/mailer');

const { checkInterval, sendTo, nodemailerConfig } = require('./config.json');

async function init() {
    try {
        const projects = await scraper();

        if(projects.length > 0) {
            await mailer.sendMail({
                from: `"Workana Scrapper" <${nodemailerConfig.auth.user}>`,
                to: sendTo,
                subject: 'Projetos disponíveis',
                template: 'index',
                context: { projects }
            });
        }

    } catch (error) {
        console.log(error);
    }

    setTimeout(() => init(), checkInterval);
};

init();
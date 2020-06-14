const puppeteer = require('puppeteer');
const { exclusions, inclusions } = require('../config.json');

let lastResults = [];

module.exports = async function scraper() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.workana.com/jobs');
    
    const projects = await page.evaluate(() => {
        const results = [];

        document
            .querySelectorAll('.project-item:not(.project-item-featured)')
            .forEach(project => {
                results.push({
                    link: project.querySelector('.project-title > a').href,
                    title: project.querySelector('.project-title > a > span').innerHTML,
                    description: project.querySelector('.project-details > div').innerText
                })
            });

        return results;
    });
    
    browser.close();

    const filteredProjects = projects.filter(project => {
        const notSended = !lastResults.some(lastProject => lastProject.title == project.title);

        const excludes = !exclusions.some(exclusion => {
            if(exclusion == '*'){ 
                return true;
            } else {
                const regexp = new RegExp(exclusion, 'i');
    
                return (
                    !!project.title.match(regexp) || 
                    !!project.description.match(regexp)
                );
            }
        });

        const includes = inclusions.some(inclusion => {
            const regexp = new RegExp(inclusion, 'i');

            return (
                !!project.title.match(regexp) ||
                !!project.description.match(regexp)
            );
        });

        return notSended && (excludes || includes);
    });

    lastResults = projects;
    
    return filteredProjects;
};
const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

const changeConfig = (doc, code, dependencies) => {
    doc.spec.env[0].value  = process.env.WEBHOOK_DISCORD;  
    const dependenciesJSON = JSON.parse(dependencies);
    delete dependenciesJSON.main;
    delete dependenciesJSON.scripts;
    delete dependenciesJSON.devDependencies;
    doc.spec.source.inline.dependencies = JSON.stringify(dependenciesJSON)
    doc.spec.source.inline.source = code;
    fs.writeFileSync('function.yaml', yaml.dump(doc));
}

try {
    const code = fs.readFileSync('./kyma.js', 'utf-8');
    const dependencies = fs.readFileSync('./package.json', 'utf-8');
    const file = fs.readFileSync('./work-item.yaml', 'utf-8');
    const doc = yaml.load(file);
    changeConfig(doc, code, dependencies);
  } catch (e) {
    console.log(e);
  }
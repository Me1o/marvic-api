const { PORT, NODE_ENV } = process.env;
const moment = require('moment');
const errors = require('mohtwize-podcastic/helpers/errors');
function reportError (err, req, res) {
  try {

    console.error(err);

    const statusCode = 500;

    // respond with json
    if (req?.accepts('json')) {
      res?.json({ case: 0, message: err.customMessage || err.message });
      return;
    }

    if (req?.accepts('html')) {
      res.status(statusCode).render('index', {
        message: err.customMessage || err.message,
        title: 'محتوايز | خطأ غير متوقع',
        whichPartial: () => '500'
      });
      return;
    }


    if (err instanceof errors.CustomError && NODE_ENV === 'production') {
      return;
    }

    const text = buildErrorString(err, req);

    console.error(text);
  } catch (err) {
    console.log('Something went wrong with reportError function.');
    console.log(err);
  }
}

function buildErrorString (err, req) {
  let text = '```';
  if (req) {
    text +=
  `
  req.url:
  ${JSON.stringify(req.url)}

  req.method:
  ${JSON.stringify(req.method)}

  req.params:
  ${JSON.stringify(req.params)}

  req.query:
  ${JSON.stringify(req.query)}

  req.body:
  ${JSON.stringify(req.body)}

  req.user:
  ${JSON.stringify(req.user)}


  PORT:
  ${PORT}
  `;

    text += `
  App version:
  ${req.header('App-version')}
  `;
  }

  text += `
  Reported on:
  ${moment().format('hh:mm:ssA DD-MM-YYYY')}
  `;

  text +=
  `
  ${typeof(err.stack) === 'object' ? JSON.stringify(err.stack) : err.stack}
  
  ${typeof(err) === 'object' ? JSON.stringify(err) : ''}
  \`\`\`
  `;

  return text;
}


module.exports = reportError;
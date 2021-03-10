# Primaverahealth Insight

![example workflow](https://github.com/primaverahealth/patient-insight/actions/workflows/main.yml/badge.svg)

## Features
- See Financial Summary
- HCCs
- Member Trend Tracker
- Claims by Specialists and Inpatient/Outpatient
- Rxs
- MRA

## Tech
Primaverahealth Insight uses a number of open source projects to work properly:
- [ReactJS](https://reactjs.org/) React makes it painless to create interactive UIs!
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) - The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses
- [Material UI](https://material-ui.com/) - React components for faster and easier web development. Build your own design system, or start with Material Design.
- [ChartJS](https://www.chartjs.org/) - Simple yet flexible JavaScript charting for designers & developers
- [date-fns](https://date-fns.org/) - date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js
- [Ract Suit](https://rsuitejs.com/) - A suite of React components, sensible UI design, and a friendly development experience.
- [Webpack](https://webpack.js.org/) - Module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging.

## Development
Want to contribute? Great!
#### Clone the Repo
    git clone https://github.com/primaverahealth/patient-insight.git
    git clone git@github.com:primaverahealth/patient-insight.git
    gh repo clone primaverahealth/patient-insight

#### Install dependencies, start server and build
    yarn
    yarn start:dev
    yarn build
### Usage sample
    <!-- Add this in the end of your HTML file -->
    <script src="https://primaverahealth-insight.herokuapp.com/bundle.js" type="text/javascript"></script>
    <script type="text/javascript">
        PatientInsight.init({
                clientId: 'uuid',
                patientId: 'uuid'
            }
        );
    </script>

Name | Possible value | Description
------- | ---------------- | ----------:
clientId  | f951b1bc-7782-11eb-9439-0242ac131114 | Authorization token
patientId  | 003acd9c-7783-11eb-9439-0242ac13453 | External EMR ID/Primavera Patient ID

## License
MIT
**Free Software, Hell Yeah!**

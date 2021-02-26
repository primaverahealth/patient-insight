# How to Embed a React Application in Any Website

### Base sample for embedding React apps using webpack

1. [How to Embed a React Application in Any Website](https://betterprogramming.pub/how-to-embed-a-react-application-on-any-website-1bee1d15617f)
1. [Your First React Typescript Project: a Todo List App](https://typeofnan.dev/your-first-react-typescript-project-todo-app/)
1. [https://www.carlrippon.com/creating-react-and-typescript-apps-with-webpack/](https://www.carlrippon.com/creating-react-and-typescript-apps-with-webpack/)
1. [How to Create Embedded React Widget](https://selleo.com/blog/how-to-create-embedded-react-widget)

---

### Commands
    yarn start # Start development environment
    yarn build # Build using production environment

---

### Usage sample
    <script src="./bundle.js" type="text/javascript"></script>
    <script type="text/javascript">
        PatientInsight.init({
                clientId: 'f951b1bc-7782-11eb-9439-0242ac130002',
                patientId: '003acd9c-7783-11eb-9439-0242ac130002'
            }
        );
    </script>

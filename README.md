# Customer Management CRM

A full-stack customer and task management system built with Angular 17 and Angular Material. Features a responsive dashboard, customer CRUD operations, task management, and PWA support.

## Features

- Customer management with CRUD operations
- Task management and assignment
- Responsive dashboard with Angular Material
- Service worker for PWA / offline support
- Route guards and HTTP interceptors
- TypeScript throughout

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Angular 17](https://angular.io/) | Frontend framework |
| [Angular Material](https://material.angular.io/) | UI component library |
| [Angular CDK](https://material.angular.io/cdk) | Component Dev Kit |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [RxJS](https://rxjs.dev/) | Reactive programming |

## Getting Started

```bash
git clone https://github.com/eladjak/Custome-Mengment-Angular.git
cd Custome-Mengment-Angular
npm install
ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser.

### Build for Production

```bash
ng build
```

## Project Structure

```
Custome-Mengment-Angular/
├── src/app/
│   ├── components/     # Feature components
│   ├── interceptors/   # HTTP interceptors
│   ├── models/         # TypeScript interfaces
│   ├── services/       # API and data services
│   ├── app.module.ts   # Root module
│   └── app.routes.ts   # Route configuration
├── public/             # Static assets
└── angular.json        # Angular CLI config
```

## License

MIT

---

⭐ If you find this useful, please star the repo!

*[README בעברית](README.he.md)*

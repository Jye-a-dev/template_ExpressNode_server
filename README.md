# Node Server Template

## Clone repo này

```bash
git clone https://github.com/Jye-a-dev/template_ExpressNode_server
```

Template khởi tạo cho Node.js backend API theo hướng dễ mở rộng, dùng:

- Node.js
- Express
- TypeScript
- Swagger / OpenAPI
- Zod
- CORS
- dotenv
- PostgreSQL package `pg`

Template này phù hợp khi bạn muốn bắt đầu nhanh với một REST API server, nhưng vẫn giữ cấu trúc thư mục rõ ràng để scale tiếp khi dự án lớn hơn.

## 1. Project này đang setup theo kiểu nào?

Repo hiện tại là kiểu:

`Node.js + Express + TypeScript + Swagger + Zod`

Đây là setup phù hợp cho:

- REST API backend
- Backend cho React/Vue/Next client riêng
- Admin API
- Service nhỏ hoặc vừa
- Dự án cần cấu trúc module rõ từ đầu
- Team muốn thống nhất format route, controller, service, validator

Nếu bạn chỉ cần một server demo rất nhỏ, có thể không cần tách nhiều folder như repo này.

## 2. Khi nào nên dùng từng kiểu setup Node backend?

### Node.js + Express + JavaScript

Dùng khi:

- muốn làm nhanh
- API nhỏ
- chưa cần TypeScript
- dự án prototype hoặc demo ngắn hạn

Cài cơ bản:

```bash
npm init -y
npm install express dotenv cors
```

### Node.js + Express + TypeScript

Dùng khi:

- muốn code an toàn hơn
- project có nhiều request/response type
- team làm việc lâu dài
- cần bắt lỗi sớm bằng typecheck

Cài thêm TypeScript:

```bash
npm install express dotenv cors
npm install -D typescript ts-node-dev @types/node @types/express @types/cors
```

### Node.js + Express + TypeScript + Swagger

Dùng khi:

- cần tài liệu API rõ ràng
- frontend/backend làm song song
- muốn test API ngay trên browser
- muốn chuẩn hóa request/response contract

Cài thêm Swagger:

```bash
npm install swagger-jsdoc swagger-ui-express
npm install -D @types/swagger-jsdoc @types/swagger-ui-express
```

### Node.js + Express + TypeScript + Swagger + Zod

Dùng khi:

- cần validate request body/query/params
- muốn giữ schema input rõ ràng theo từng module
- muốn giảm lỗi dữ liệu sai từ client
- cần template đủ tốt để scale tiếp

Đây chính là kiểu setup của repo này.

### NestJS

Nên dùng thay vì template này nếu bạn cần:

- framework opinionated hơn
- dependency injection mạnh
- decorator-based architecture
- module system lớn, chuẩn enterprise
- team đã quen NestJS

Template repo này không nhắm tới framework nặng. Nó là Express API template gọn, rõ, dễ chỉnh.

## 3. Cài và chạy project

### Yêu cầu

- Node.js 20+
- npm 10+

### Cài dependency

```bash
npm install
```

### Tạo file môi trường

```bash
cp .env.example .env
```

Trên Windows PowerShell có thể dùng:

```powershell
Copy-Item .env.example .env
```

### Chạy môi trường dev

```bash
npm run dev
```

### Build production

```bash
npm run build
```

### Chạy bản build

```bash
npm start
```

### Typecheck

```bash
npm run typecheck
```

## 4. URL mặc định

Sau khi chạy dev server:

- API root: `http://localhost:3000/api/v1`
- Swagger docs: `http://localhost:3000/docs`
- Server root: `http://localhost:3000`

Các giá trị này có thể đổi trong `.env`.

## 5. Cấu trúc thư mục hiện tại

```text
src/
├─ config/
│  ├─ config.md
│  ├─ database.ts
│  ├─ env.ts
│  └─ swagger.config.ts
├─ constants/
│  ├─ constants.md
│  └─ http_status.ts
├─ middlewares/
│  ├─ middlewares.md
│  ├─ error.middleware.ts
│  └─ validate.middleware.ts
├─ modules/
│  ├─ modules.md
│  └─ template_modules/
│     ├─ template_modules.md
│     ├─ template_modules.route.ts
│     ├─ template_modules.type.ts
│     ├─ template_modules.controller.ts
│     ├─ template_modules.model.ts
│     ├─ template_modules.validator.ts
│     └─ template_modules.service.ts
├─ routes/
│  ├─ routes.md
│  └─ index.ts
├─ swagger/
│  ├─ swagger.md
│  ├─ swagger.ts
│  └─ docs/
│     └─ docs.md
├─ types/
│  ├─ types.md
│  └─ express.d.ts
├─ utils/
│  ├─ utils.md
│  └─ async_handler.ts
├─ src.md
├─ app.ts
└─ main.ts
```

Ý nghĩa chính:

- `config/`: cấu hình env, database, Swagger config
- `constants/`: hằng số dùng chung
- `middlewares/`: middleware Express dùng chung
- `modules/`: nơi đặt các module nghiệp vụ
- `modules/template_modules/`: module mẫu để copy khi tạo feature mới
- `routes/`: router tổng của API
- `swagger/`: setup Swagger runtime và docs bổ sung
- `types/`: khai báo type global hoặc framework-level
- `utils/`: helper dùng chung
- `app.ts`: cấu hình Express app
- `main.ts`: entry chạy server

## 6. Luồng chạy hiện tại của app

Luồng cơ bản:

1. `src/main.ts` import Express app
2. `main.ts` đọc port từ `env`
3. `app.ts` tạo Express app
4. `app.ts` gắn middleware global
5. `setupSwagger(app)` gắn Swagger UI
6. `app.ts` mount router tổng tại `API_PREFIX`
7. `routes/index.ts` là nơi gom route module
8. Module route gọi controller
9. Controller gọi service
10. Service xử lý business logic và làm việc với model/database nếu cần

Tóm tắt:

```text
main.ts
-> app.ts
-> routes/index.ts
-> module.route.ts
-> module.controller.ts
-> module.service.ts
-> module.model.ts
```

## 7. Cách tạo một module mới theo style của repo này

Mỗi module nên có đúng 6 file:

```text
src/modules/products/
├─ products.route.ts
├─ products.type.ts
├─ products.controller.ts
├─ products.model.ts
├─ products.validator.ts
└─ products.service.ts
```

Ý nghĩa từng file:

- `route`: khai báo endpoint và gắn middleware/validator
- `type`: định nghĩa TypeScript type/interface cho module
- `controller`: nhận request, gọi service, trả response
- `model`: định nghĩa dữ liệu liên quan database/persistence
- `validator`: schema validate body/query/params
- `service`: business logic chính của module

Có thể copy folder:

```text
src/modules/template_modules
```

Sau đó đổi tên folder và prefix file theo module thật.

Ví dụ:

```text
template_modules.route.ts
-> products.route.ts
```

## 8. Quy tắc đặt tên đang dùng

### Folder

Dùng `snake_case` nếu tên có nhiều từ:

- `template_modules`
- `user_profiles`
- `order_items`

### File trong module

Dùng format:

```text
module_name.route.ts
module_name.type.ts
module_name.controller.ts
module_name.model.ts
module_name.validator.ts
module_name.service.ts
```

Ví dụ:

```text
products.route.ts
products.type.ts
products.controller.ts
products.model.ts
products.validator.ts
products.service.ts
```

### File helper/config

Ưu tiên dùng `_` thay vì `-`:

- `async_handler.ts`
- `http_status.ts`
- `swagger.config.ts`

## 9. Swagger trong repo này

Repo đã setup Swagger bằng:

- `swagger-jsdoc`
- `swagger-ui-express`

Các file chính:

- `src/config/swagger.config.ts`: cấu hình OpenAPI
- `src/swagger/swagger.ts`: mount Swagger UI vào Express app
- `src/swagger/docs/`: nơi đặt docs bổ sung nếu cần

Swagger đang quét route theo pattern:

```text
src/modules/**/*.route.ts
```

Vì vậy khi tạo module mới, nên đặt file route theo đúng hậu tố:

```text
*.route.ts
```

Docs mặc định chạy tại:

```text
http://localhost:3000/docs
```

Có thể đổi bằng biến:

```env
SWAGGER_ROUTE=/docs
```

## 10. Env trong repo này

File `.env.example` là mẫu cho người clone về.

Các biến hiện có:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1

SWAGGER_ROUTE=/docs
SWAGGER_TITLE=Template Node Server API
SWAGGER_VERSION=1.0.0
SWAGGER_DESCRIPTION=Express TypeScript API template

DATABASE_URL=postgres://postgres:postgres@localhost:5432/template_node_server
```

Ý nghĩa:

- `NODE_ENV`: môi trường chạy app
- `PORT`: port server
- `API_PREFIX`: prefix chung cho API
- `SWAGGER_ROUTE`: đường dẫn Swagger UI
- `SWAGGER_TITLE`: tên hiển thị trong Swagger
- `SWAGGER_VERSION`: version API
- `SWAGGER_DESCRIPTION`: mô tả API
- `DATABASE_URL`: connection string database nếu dự án dùng PostgreSQL

## 11. Validation trong repo này

Repo có sẵn middleware:

```text
src/middlewares/validate.middleware.ts
```

Mục tiêu:

- validate `body`
- validate `params`
- validate `query`
- gom schema theo từng module

Khi làm module thật, nên đặt schema trong:

```text
module_name.validator.ts
```

Ví dụ:

```text
products.validator.ts
```

Controller không nên tự validate thủ công. Route nên gắn validator trước khi request đi vào controller.

## 12. Error handling trong repo này

Repo có sẵn:

```text
src/middlewares/error.middleware.ts
```

Middleware này gồm:

- `notFoundMiddleware`: xử lý route không tồn tại
- `errorMiddleware`: xử lý lỗi tập trung

Mục tiêu:

- tránh lặp try/catch quá nhiều
- response lỗi thống nhất
- dễ mở rộng thêm error format sau này

Nếu service/controller có xử lý async, có thể dùng:

```text
src/utils/async_handler.ts
```

## 13. Database trong repo này

Repo có package `pg` và file placeholder:

```text
src/config/database.ts
```

Hiện file này chưa ép sẵn implementation database để template vẫn nhẹ và trung lập.

Khi cần dùng PostgreSQL, có thể setup pool trong `database.ts`, ví dụ:

```ts
import { Pool } from "pg";
import { env } from "./env";

export const db = new Pool({
  connectionString: env.databaseUrl,
});
```

Nếu dùng ORM như Prisma, Drizzle, TypeORM hoặc Sequelize, có thể thay nội dung file này theo ORM đó.

## 14. Quy tắc tổ chức code nên giữ

- Route chỉ nên khai báo endpoint và middleware
- Controller chỉ nên nhận request, gọi service, trả response
- Service chứa business logic
- Model chứa logic liên quan database/persistence
- Validator chứa schema validate request
- Type chứa type/interface dùng trong module
- Utils nên là helper tổng quát, không phụ thuộc module cụ thể
- Config nên tập trung trong `src/config`
- Không nên nhồi business logic vào `app.ts` hoặc `main.ts`

## 15. Cách scale project khi API lớn hơn

Khi app tăng độ phức tạp, có thể mở rộng thêm:

- `repositories/`
- `schemas/`
- `jobs/`
- `queues/`
- `emails/`
- `storage/`
- `cache/`
- `logger/`
- `tests/`

Ví dụ:

```text
src/
├─ config/
├─ constants/
├─ middlewares/
├─ modules/
│  ├─ auth/
│  ├─ users/
│  ├─ products/
│  └─ orders/
├─ repositories/
├─ services/
├─ jobs/
├─ types/
└─ utils/
```

Nếu team đi theo feature-based architecture, có thể giữ controller, route, validator, service, model trong từng module như template hiện tại.

## 16. Khi nào nên tách repository?

Nên tách repository khi:

- service bắt đầu có nhiều query database
- nhiều service dùng chung một cách truy xuất dữ liệu
- muốn test business logic dễ hơn
- muốn đổi database/ORM ít ảnh hưởng service

Ví dụ:

```text
src/modules/products/products.repository.ts
```

Hoặc tách cấp global:

```text
src/repositories/products.repository.ts
```

Không cần tách quá sớm nếu module vẫn nhỏ.

## 17. Checklist khi tạo API project mới

- clone repo
- cài dependency
- tạo `.env` từ `.env.example`
- đổi tên project trong `package.json`
- đổi Swagger title/description
- kiểm tra `PORT` và `API_PREFIX`
- tạo module mới từ `template_modules`
- mount module route vào `routes/index.ts`
- viết validator trước khi viết controller
- giữ business logic trong service
- chạy typecheck/build trước khi commit

## 18. Gợi ý hướng phát triển tiếp cho template này

Nếu muốn biến template này thành base mạnh hơn, có thể thêm:

- auth flow
- JWT middleware
- refresh token
- role/permission guard
- request logger
- centralized app error class
- PostgreSQL pool hoàn chỉnh
- Prisma hoặc Drizzle
- migration setup
- test setup bằng Vitest/Jest
- Dockerfile
- Docker Compose cho database
- CI check build/lint/test
- rate limit
- security headers bằng Helmet
- API response format chuẩn hóa

## 19. Tóm tắt

Nếu bạn muốn một setup backend cân bằng giữa:

- dễ bắt đầu
- dễ đọc
- dễ scale
- không quá nặng framework
- có Swagger sẵn
- có cấu trúc module rõ

thì `Node.js + Express + TypeScript + Swagger + Zod` là lựa chọn rất thực dụng.

Template này đang đi theo hướng đó:

- entry rõ
- config rõ
- Swagger rõ
- module rõ
- folder có tài liệu song ngữ
- dễ copy module để phát triển tiếp

---

Có thể viết tiếp README theo hướng ngắn gọn hơn cho team nội bộ, hoặc giữ bản hiện tại như tài liệu onboarding cho người mới clone repo.

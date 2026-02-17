
# SuperDoc Client Example

This project demonstrates how to use the `superdoc` library in a Vue 3 application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)

## Setup

1.  **Установка зависимостей:**

    ```bash
    pnpm install
    ```

2.  **Обновление версии `superdoc` (Тестирование локальных изменений):**

    Если вы внесли изменения в основной проект `superdoc` и хотите проверить их в этом примере (как в отдельном проекте), выполните следующие действия:

    **В корне пакета `superdoc` (packages/superdoc):**
    
    Соберите пакет в архив `.tgz`. Это эмулирует релиз пакета.
    ```bash
    pnpm pack
    mv superdoc-*.tgz superdoc.tgz
    ```
    
    **Перенесите файл `superdoc.tgz` в корень этого проекта (examples/collaboration/production/client).**

    **В этой директории (examples/collaboration/production/client):**
    
    Установите пакет из локального архива.
    ```bash
    pnpm add ./superdoc.tgz
    ```
    
    *Примечание: После проверки не забудьте вернуть версию из git, если это необходимо, выполнив `pnpm add superdoc@git+https://github.com/org-event/super-docx-raw.git#tag_name` или просто откатив изменения в `package.json`.*

3.  **Обновление версии из репозитория (Release):**

    Когда в основном репозитории `superdoc` появляется новый тег (например, `v1.2.3`), обновите зависимость в этом проекте следующей командой:

    ```bash
    pnpm add superdoc@git+https://github.com/org-event/super-docx-raw.git#v1.2.3
    ```
    
    Где `v1.2.3` — это имя нового тега. Это обновит `package.json` и `pnpm-lock.yaml`, подтянув актуальную версию.

---

### Как создать новый релиз (чтобы он был доступен через git)

Если вы проверили изменения через `superdoc.tgz` и хотите сделать их доступными для всех (опубликовать):

1.  **Подготовка сборки (Важно!):**
    Так как мы устанавливаем пакет напрямую из Git, в репозитории должна лежать собранная папка `dist`.
    
    ```bash
    # В корне проекта (или в packages/superdoc)
    pnpm run build
    
    # Принудительно добавляем dist в git (даже если она в .gitignore)
    git add packages/superdoc/dist -f
    ```

2.  **Зафиксируйте изменения:**
    ```bash
    git commit -m "chore: release version 0.0.10 with build artifacts"
    git push
    ```

3.  **Создайте новый тег версии:**
    ```bash
    # Например, версия 0.0.10
    git tag 0.0.10
    git push origin 0.0.10
    ```

4.  **Обновите клиент:**
    Теперь в (examples/collaboration/production/client) можно использовать новую версию:
    ```bash
    pnpm add superdoc@git+https://github.com/org-event/super-docx-raw.git#0.0.10
    ```

2.  **Configure environment variables:**

    Copy the example environment file:

    ```bash
    cp .env.example .env
    ```

## Development

To start the development server:

```bash
pnpm run dev
```

The server is configured to listen on all network interfaces (`0.0.0.0`). You can access the application via:
- `http://localhost:5173`
- `http://<your-ip>:5173`
- `http://<your-domain>:5173`

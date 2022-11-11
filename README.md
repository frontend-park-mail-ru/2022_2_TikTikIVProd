# 2022_2_TikTikIVProd
Проект VK команды "TikTikIVProd"

## Гайд по установке и работе с TypeScript
1. Установить [Node.js](https://nodejs.org/en/)

2. ```bash
   npm install -g typescript // от имени администратора или с sudo
   ```

3. ```bash
   tsc -t "ES5" ./index.ts
   ```

4. Указывать другие файлы не нужно, при использовании импортов они создадутся автоматически.

5. В HTML указываем ссылку на js файл(из примера выше index.js)

## Настройка линтера

1. ```bash
   npm install -D prettier eslint-plugin-prettier eslint-config-prettier
   ```

2. **В секцию scripts в package.json добавляем скрипты**

   При запуске этих скриптов выполнится проверка проекта (первая команда) и автоисправление ошибок (вторая команда, аналогичная первой, но с опцией --fix).

   ```json
   "scripts": {
     ...
     "lint": "eslint \"./src/**/*.{js,jsx,ts,tsx}\"",
     "lint:fix": "eslint \"./src/**/*.{js,jsx,ts,tsx}\" --fix"
   }
   ```

3. **В корень проекта добавляем файл .eslintrc со следующим содержимым**

   Добавляем в проект конфиг линтера, в соответствие с которым будем осуществляться проверка кода. В нем указываем, что eslint должен интегрироваться с TypeScript и prettier, а так же прописываем некоторые правила вручную (запрет на использование // // // console.log() и строгий порядок импортов в файле). Полный список правил, который можно прописать для eslint, можно найти [здесь](https://eslint.org/docs/latest/rules/).

   ```json
   {
     "extends": [
       "typescript",
       "plugin:prettier/recommended"
     ],
     "plugins": ["prettier"],
     "rules": {
       "no-// console": "error",
       "prettier/prettier": "error",
       "import/order": [
         "error",
         {
           "groups": [
             "builtin",
             "external",
             "internal"
           ],
           "pathGroups": [
             {
               "pattern": "TypeScript",
               "group": "external",
               "position": "before"
             }
           ],
           "pathGroupsExcludedImportTypes": [
             "typescript"
           ],
           "newlines-between": "always",
           "alphabetize": {
             "order": "asc",
             "caseInsensitive": true
           }
         }
       ]
     }
   }
   ```

4. ### **Настройка IDE**

   Интеграция линтера с IDE - очень удобное решение, значительно ускоряющее разработку. Например, ваша IDE может сразу находить и подсвечивать ошибки линтера или же автоматически форматировать код.

   > Ниже приведен пример настройки для VS Code (этот редактор бесплатный :) ), однако если вы используете другой редактор, то настоятельно рекомендуем вам подружить его с линтером.

   Для интеграции VS Code c линтером создадим в корне проекта директорию .vscode, а внутри неё файл settings.json со следующим содержимым:

   ```json
   {
     "editor.formatOnSave": true,
     "eslint.format.enable": true
   }
   ```


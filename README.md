# 🧭 Protocolo de Trabajo con Git 

Este documento define las normas básicas para trabajar con Git y GitHub en equipo. El objetivo es mantener una estructura ordenada, comprensible y colaborativa.

---

## 📂 Organización de ramas

- Cada colaboradora trabajará en **su propia rama**, creada a partir de `Develop`.
- Formato de nombre de rama:
Feature<Nombre_Colaboradora>/<Nombre_Feature>

### Ejemplos:
- `FeatureNatali/Contacts`
- `FeatureCarmen/LoginForm`
- `FixBel/HeaderOverflow`

> 💡 Las ramas para bugs pueden usar el prefijo `Fix`, y para mejoras técnicas `Refactor`.

---

## 📌 Reglas para las ramas

- Antes de crear una nueva rama, se debe **consultar con la encargada del repositorio**.
- Las ramas deben mantenerse actualizadas con `develop` usando `git pull origin develop`.
- Los cambios deben subirse frecuentemente (idealmente, **una vez al día por la tarde**).

---

## 💬 Commits

Los mensajes de commits deben ser claros, breves y descriptivos.  
Formato recomendado:
[Tipo] Descripción breve del cambio


### Tipos comunes:
- `[Add]` — Para nuevas funcionalidades
- `[Fix]` — Para correcciones de errores
- `[Update]` — Para modificaciones
- `[Remove]` — Para eliminar código
- `[Docs]` — Para cambios en documentación

### Ejemplos:
- `[Add] Formulario de contacto`
- `[Fix] Error en validación de email`
- `[Docs] Actualizar instrucciones del README`

---

## 🔁 Pull Requests

- Todos los cambios deben integrarse a `develop` mediante un **Pull Request (PR)**.
- El PR debe:
  - Tener un título claro
  - Explicar brevemente qué se hizo
  - Ser revisado por al menos una compañera antes de hacer merge

---

## 🔐 Protección del repositorio

- No se permite hacer **push directo a `main` o `develop`**.
- Está **prohibido usar `git push --force`** en ramas compartidas.
- Cada colaboradora debe mantener un **backup de su trabajo local o remoto**.

---

## 🛠 Buenas prácticas

- Trabaja en ramas pequeñas y específicas por tarea.
- No mezcles varias funcionalidades en un solo PR.
- Avisa al equipo si detectas conflictos o necesitas ayuda con `merge`.

---

## ✅ Evaluación de cambios

Los criterios para aceptar o rechazar un commit/PR incluirán:

- Claridad y estructura del código
- Que no se rompa funcionalidad existente
- Que los mensajes de commit sean descriptivos
- Cumplimiento del formato de nombres y ramas

---

_Cualquier duda sobre este protocolo puede discutirse en reunión de equipo o directamente con la encargada del repositorio._

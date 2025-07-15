# Basic Workflow (*WIP*)

## HTML entry points:

- index.html (~)
- home.html
- products.html
- profile.html
- auth.html (login y register inyectados aquí)
- contact.html (~)
- publicProfileS.html (~)

## JS: 

- main.js(~)
- publicProfile.js <-- profile.html
- privateProfile.js <-- profile.html
- register.js <-- auth.html
- logIn.js <-- auth.html
- home.js <-- index.html
- contact.js <-- ?
- utils.js (pueden estar divididos según su funcionalidad, e.g validations,... )
- shoppingCart.js <--products.html
- publicProfileS.js <-- publicProfileS.html (~)

## Navigation

### ELEMENTS:
si usuario no loggeado

	navbar con botones: 
 
		- btn login
  
		- btn register
  
		- btn contacto 
  
		- btn market
  
			- categoría artesanía 1
   
			- categoría artesanía 2
   
			- ...
   
		- btn artisans
  
			- categoría artisan 1
   
			- categoría artisan 2
   
			- …
   
si usario loggeado

	navbar con botones
 
		- btn profile
  
			- view profile
   
			- edit profile
   
		- btn contact

		- btn market
  
			- categoría artesanía 1
   
			- categoría artesanía 2
   
			- ...
   
		- btn artisans
  
			- categoría artisan 1
   
			- categoría artisan 2
   
			- …


## Navigation: landing page -->

	**navbar**
 
	si usuario loggeado (localStorage)
 
		hide register btn
		
	si aprietoboton login
 
		si usuario loggeado
  
			perfil
   
		si usuario no loggeado
  
			--> auth.html con login.js inyectado
   
	si aprietoboton register
 
		auth.html con register.js inyectado 
  
	si aprietoboton contacto 
 
		? contact.html con contact.js inyectado
  
		: contact.js inyectado somewhere
  
	si aprietoboton market
 
		product.html con product.js inyectado
  
	si aprietoboton artisans
 
		publicProfileS.html con publicProfileS.js inyectado
  
		si aprietobotón publicProfile(artesano1)
  
			publicProfile.html con publicProfile.js
	
	**hero**
 
	carrusel perfiles individuales artesanos
 
		si aprietobotón publicProfile(artesano1)
  
			publicProfile.html con publicProfile.js

	**container**

	**footer** (SIEMPRE VISIBLE, EN HTML)


# File System Structure


# Esame Finale
## google-books


# Front-end:

Components:
- login.component
- email
- password
- register.component
- email
- password
- conferma password
- nazionalità
Services:
- login.service

# Back-end:

Routers:
- authRouter:
- login (post)
- register (post)
- reader / customer:
- fare un ordine (post)
- regalare un buono (post)
- vedere i miei libri (get)
- scrivere una recensione di un libro che ho (post)
- eliminare un mio libro (delete)
- ricaricare il conto (post/put)
- vedere le tue recensioni (get)
- modificare una recensione (put)
- writer / author:
- scrivere un libro (post)
- ritirare un libro pubblicato (delete)
- modificare un libro (put)
- visualizza i guadagni (get)

Models:
- Book
- Scrittore
- Lettore

Interfaces:
- User (generico)
- Recensione:
id
data
text
valutazione
ordine:
id
data
inventario (array di libri | buoni)
tot
buono:
id
scadenza (es 10 giorni dopo l’ordine)
soldi









JSONs Database:

books:
id
titolo
autore/i[] (admin id)
case editrici[] (id)
recensioni[] 
costo
data pubblicazione
categoria
users:
email
id
password
?token
libri[]
ordini
ruolo: customer | autore
nazionalità
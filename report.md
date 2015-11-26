#Technology report

##Vagrant
Heldur utan um allar stillingar og dependency fyrir vinnu umhverfið okkar. Allt fer í eina skrá sem er svo hægt að deila til að tryggja að allir séu að vinna við sömu aðstæður í sama umhverfi. Umhverfin sjálf eru keyrð upp t.d. í VirtualBox eða annari sýndarvél. Vagrant er þó ekki bundið við að keyra á local sýndarvélum.

##VirtualBox
Gerir okkur kleyft að keyra x86 sýndarvélar. Hentugt til að setja upp ýmis stýrikerfi á sömu vél án þess að þurfa að endurræsa vélina. 

##Grunt
Framkvæmir ýmiss konar verkefni sem þarf að gera áður en forritið er keyrt t.d. að keyra unit test, pakka saman og minnka .js og .css skrár fyrir vefsíður og keyra forritið sjálft.

##npm
Pakkaumhverfið sem notast er við í node, getur lesið úr package.json skrá til að sækja öll forritssöfn sem verkefnið er háð. Getur einnig búið til og bætt pökkum við package.json skrá verkefnis sem verið er að vinna í(eða bætt pökkunum í global package cache á vélinni).

##nodejs
Er javascript keyrslu umhverfi sem keyrir á server-side, þ.e. það er ekki bundið við vafra. Node notar ekki þræði til að vinna úr mörgum hlutum í einu heldur notar það atburði, callbacks og non-blocking IO.

##bower
Pakkaumhverfi sem aðallega er notað til að sækja client side javascript söfn.

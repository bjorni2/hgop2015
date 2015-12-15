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

#Load testing
Eftir nokkrar keyrslur af álagsprófinu festi ég endurtekningarnar á 70 og timeout á 7,5s. Augljóslega ekki mikið álag sem vélin mín ræður við í þessu umhverfi.

Álagsprófin keyra parallel eins og þau eru sett upp. Í nodejs eru IO köll non blocking, þegar IO kall er framkvæmt er yfirleitt síðasti stikinn í fallinu callback fall sem kallað er í þegar IO-inu er lokið. Eftir að kallað hefur verið í end fallið í request og áður en að svarið berst til baka er því hægt að halda áfram að keyra kóðann og þ.a.m. senda fleiri request.

#Day 10 - traceability, production env, and deploy any version

* What does this give us? Who would use the capability to track versions and why? Who would use capability to deploy any version and why?
 * Nú höfum við möguleika á því að fara aftur í tímann ef eitthvað fer úrskeiðis og keyra upp eldri útgáfu af hugbúnaðinum á einfaldan hátt.
 * ??
 * Operation teymi gætu nýtt sér það að deploya hvaða útgáfu sem er, bæði ef að bakka þarf með nýja útgáfu og fara í eldri og einnig ef viðskiptavinur þarf gamla útgáfu af kerfinu af einhverri ástæðu(Samþætting við önnur kerfi?).

* What was wrong with having docker push in the deployment script rather than in the dockerbuild.sh script?
 * Við endurnýtum deployment skriftuna fyrir öll umhverfi, ef að push er framkvæmt þar værum við að gera það jafn oft og fjöldi umhverfa sem við deployum í. Með því að færa þetta í dokcerbuild.sh er push einungis framkvæmt einu sinni þar og deployment skriftan sér bara um að sækja og keyra upp. 

* How does the "deploy any version, anywhere" build feature work? Hint: Track GIT_COMMIT
 * Það er hægt að merka containera í docker með tagi, í okkar tilfelli notum við git commit sha-ið sem tag sem einkennir þá containerinn sem útgáfu frá ákveðnu commiti í git. Ferlið byrjar í dockerbuild skriftunni sem taggar containerinn, deployment skriftan notar svo þetta sama tag til að sækja ákveðna útgáfu frá dockerhub og keyra hana upp. Þetta gerist allt sjálfkrafa í Jenkins þegar nýtt commit er sett inn á repoið á GitHub en einnig er mögulegt að keyra sjálfur upp deployment skriftuna og gefa henni ákveð commit sha sem færibreytu sem er þá notuð til að sækja þá tilteknu útgáfu frá dockerhub og þ.a.l. er hægt að keyra upp hvaða útgáfu sem er hvar sem er.

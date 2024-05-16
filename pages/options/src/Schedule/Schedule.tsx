import React from 'react';
import '../Options.css';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';

interface SelectedSchool {
  label: string;
  unitGuid: string;
}

interface SelectedClass {
  label: string;
  groupGuid: string;
}

const Schedule = () => {
  const [selectedHostName, setSelectedHostName] = React.useState<string | null>(null);
  const [selectedSchoolYear, setSelectedSchoolYear] = React.useState<string | null>(null);
  const [schools, setSchools] = React.useState<any[]>([]);
  const [selectedSchool, setSelectedSchool] = React.useState<SelectedSchool | null>(null);
  const [classes, setClasses] = React.useState<any[]>([]);
  const [selectedClass, setSelectedClass] = React.useState<SelectedClass | null>(null);

  const hostNames: string[] = [
    '4ansgymnasium.skola24.se',
    'abf.skola24.se',
    'abfsthlm.skola24.se',
    'academediaeductus.skola24.se',
    'agape.skola24.se',
    'agestafhsk.skola24.se',
    'ahlaforsfriaskola.skola24.se',
    'akademiskaskolan.skola24.se',
    'alazharskolan.skola24.se',
    'alazharskolanorebro.skola24.se',
    'ale.skola24.se',
    'aleutbildning.skola24.se',
    'algebraskolan.skola24.se',
    'alingsas.skola24.se',
    'alingsas-idp.skola24.se',
    'alingsas-sso.skola24.se',
    'alingsasyrkesgymnasium.skola24.se',
    'almhult.skola24.se',
    'alt.skola24.se',
    'alvdalen.skola24.se',
    'alvdalensutbildningscentrum.skola24.se',
    'alvesta.skola24.se',
    'alvsbyn.skola24.se',
    'amal.skola24.se',
    'amb.skola24.se',
    'aneby.skola24.se',
    'angdala.skola24.se',
    'ange.skola24.se',
    'angelholm.skola24.se',
    'angkarr.skola24.se',
    'angsdalsskola.skola24.se',
    'aniaragymnasiet.skola24.se',
    'antonskolan.skola24.se',
    'apelrydskolan.skola24.se',
    'appskolan.skola24.se',
    'aprendere.skola24.se',
    'arboga.skola24.se',
    'are.skola24.se',
    'arenautbildning.skola24.se',
    'arjang.skola24.se',
    'arvika.skola24.se',
    'asken.skola24.se',
    'askersund.skola24.se',
    'aspero.skola24.se',
    'astorp.skola24.se',
    'atvidaberg.skola24.se',
    'avesta.skola24.se',
    'backaskolan.skola24.se',
    'backatorpsskolan.skola24.se',
    'baktorpskolan.skola24.se',
    'banerportsskolan.skola24.se',
    'bastad.skola24.se',
    'bastad-foralder.skola24.se',
    'bengtsfors.skola24.se',
    'berganaturbruk.skola24.se',
    'betel.skola24.se',
    'birkagardenfhsk.skola24.se',
    'birkaskolan.skola24.se',
    'bjorkenasskolan.skola24.se',
    'bjorkofriskola.skola24.se',
    'bjurholm.skola24.se',
    'bjuv.skola24.se',
    'bladins.skola24.se',
    'bolebyskola.skola24.se',
    'bollebygd.skola24.se',
    'bollerup.skola24.se',
    'bollnas.skola24.se',
    'bollnas-mobil.skola24.se',
    'boras.skola24.se',
    'borgholm.skola24.se',
    'borlange.skola24.se',
    'borlange-sso.skola24.se',
    'boskolan.skola24.se',
    'botkyrka.skola24.se',
    'botkyrkafriskola.skola24.se',
    'boxholm.skola24.se',
    'bracke.skola24.se',
    'brackediakoni.skola24.se',
    'brandstromska.skola24.se',
    'britishschools.skola24.se',
    'bromolla.skola24.se',
    'burlov.skola24.se',
    'calleflygare.skola24.se',
    'carlssonsskola.skola24.se',
    'casamontessoriskola.skola24.se',
    'centrina.skola24.se',
    'christinaskolan.skola24.se',
    'cis.skola24.se',
    'citygymnasiet.skola24.se',
    'communityskolan.skola24.se',
    'cordobainternational.skola24.se',
    'cuben.skola24.se',
    'curtnicolingymnasiet.skola24.se',
    'cybergymnasiet.skola24.se',
    'dalsed.skola24.se',
    'dammsdal.skola24.se',
    'danderyd.skola24.se',
    'dansomusikal.skola24.se',
    'degerfors.skola24.se',
    'demo.skola24.se',
    'designgymnasiet.skola24.se',
    'dibber.skola24.se',
    'dibbersverige.skola24.se',
    'didaktus.skola24.se',
    'distra.skola24.se',
    'djurgardenswaldorf.skola24.se',
    'djurgymnasiet.skola24.se',
    'donnergymnasiet.skola24.se',
    'dorotea.skola24.se',
    'drottningblankasgy.skola24.se',
    'drottningholmskolan.skola24.se',
    'ebbabraheskolan.skola24.se',
    'ebbapettersson.skola24.se',
    'eda.skola24.se',
    'eductus.skola24.se',
    'einarhansengymnasiet.skola24.se',
    'ekebyskola.skola24.se',
    'ekero.skola24.se',
    'eks.skola24.se',
    'eksjo.skola24.se',
    'eksjokommun.skola24.se',
    'elajo.skola24.se',
    'ellenkeyskolan.skola24.se',
    'emmaboda.skola24.se',
    'enkoping.skola24.se',
    'enp.skola24.se',
    'enskedebyskola.skola24.se',
    'enskildagrund.skola24.se',
    'enskildagymnasiet.skola24.se',
    'erk.skola24.se',
    'escandinavo.skola24.se',
    'eskilstuna.skola24.se',
    'eslov.skola24.se',
    'eslov-elev.skola24.se',
    'eslov-personal.skola24.se',
    'eslovsfhsk.skola24.se',
    'eslov-vardnadshavare.skola24.se',
    'esmalmkoping.skola24.se',
    'esn.skola24.se',
    'esrogge.skola24.se',
    'essunga.skola24.se',
    'estetiskaskolan.skola24.se',
    'estniskaskolan.skola24.se',
    'europaskolan.skola24.se',
    'falkenberg.skola24.se',
    'falkenberg-sso.skola24.se',
    'falkoping.skola24.se',
    'falkoping-sso.skola24.se',
    'falufrigymnasium.skola24.se',
    'falun.skola24.se',
    'falun-sso.skola24.se',
    'falun-test.skola24.se',
    'fargelanda.skola24.se',
    'fastighetsakademin.skola24.se',
    'filipstad.skola24.se',
    'filipstad-sso.skola24.se',
    'filmomusikgymnasiet.skola24.se',
    'finspang.skola24.se',
    'finspang-sso.skola24.se',
    'flen.skola24.se',
    'flen-sso.skola24.se',
    'flyinge.skola24.se',
    'folkuniversitetetost.skola24.se',
    'folkuniversitetetvast.skola24.se',
    'forshaga.skola24.se',
    'forshaga-foralder.skola24.se',
    'forshaga-sso.skola24.se',
    'framstegsskolan.skola24.se',
    'framtidsgymnasiet.skola24.se',
    'framtidskompassen.skola24.se',
    'franskaskolangbg.skola24.se',
    'franskaskolansthlm.skola24.se',
    'fredrikshov.skola24.se',
    'fredsbergsfriskola.skola24.se',
    'fredsborgskolan.skola24.se',
    'freinetskolanhugin.skola24.se',
    'freinetskolanmimer.skola24.se',
    'friaemilia.skola24.se',
    'frialaroverken.skola24.se',
    'fridaskolorna.skola24.se',
    'friskolanlyftet.skola24.se',
    'fristadsfhsk.skola24.se',
    'fryshuset.skola24.se',
    'fryxellskaskolan.skola24.se',
    'futuraskolan.skola24.se',
    'gagnef.skola24.se',
    'gavle.skola24.se',
    'gavle-sso.skola24.se',
    'geflemontessoriskola.skola24.se',
    'gellivare.skola24.se',
    'gislaved.skola24.se',
    'glimakrafhsk.skola24.se',
    'globalbildning.skola24.se',
    'globen.skola24.se',
    'gluntensmontessori.skola24.se',
    'gnesta.skola24.se',
    'gnosjo.skola24.se',
    'goteborg.skola24.se',
    'goteborgstekniskacollege.skola24.se',
    'gotene.skola24.se',
    'gotland.skola24.se',
    'gotlandgrontcentrum.skola24.se',
    'gotland-sso.skola24.se',
    'grastorp.skola24.se',
    'grebbestadsfhsk.skola24.se',
    'grennaskolan.skola24.se',
    'gripsholmsskolan.skola24.se',
    'grums.skola24.se',
    'grundskolanaventyret.skola24.se',
    'gryningeskolan.skola24.se',
    'gti.skola24.se',
    'gullspang.skola24.se',
    'haabo.skola24.se',
    'habo.skola24.se',
    'hagfors.skola24.se',
    'hallsberg.skola24.se',
    'hallstahammar.skola24.se',
    'halmstad.skola24.se',
    'halmstad-mobil.skola24.se',
    'hammaro.skola24.se',
    'haninge.skola24.se',
    'hannaskolan.skola24.se',
    'haparanda.skola24.se',
    'harjedalen.skola24.se',
    'harnosand.skola24.se',
    'harryda.skola24.se',
    'harryda-sso.skola24.se',
    'hassleholm.skola24.se',
    'heby.skola24.se',
    'hedemora.skola24.se',
    'helixgymnasiet.skola24.se',
    'helleborusskolan.skola24.se',
    'hellefors.skola24.se',
    'hellefors-sso.skola24.se',
    'helsingborg.skola24.se',
    'helsingborg-anst.skola24.se',
    'helsingborg-eid.skola24.se',
    'helsingborg-elev.skola24.se',
    'hermods.skola24.se',
    'hermodsdcc.skola24.se',
    'hermodsgymnasium.skola24.se',
    'herrljunga.skola24.se',
    'hjalmared.skola24.se',
    'hjo.skola24.se',
    'hjofhsk.skola24.se',
    'HKKB.skola24.se',
    'hofors.skola24.se',
    'hoganas.skola24.se',
    'hoganas-sso.skola24.se',
    'hogsby.skola24.se',
    'honesta.skola24.se',
    'hoor.skola24.se',
    'horby.skola24.se',
    'horby-sso.skola24.se',
    'horby-vardnadshavare.skola24.se',
    'huddinge.skola24.se',
    'huddinge-sso.skola24.se',
    'hudikgymnasiet.skola24.se',
    'hudikskolan.skola24.se',
    'hudiksvall.skola24.se',
    'hudiksvall-sso.skola24.se',
    'hufb.skola24.se',
    'hufb-sso.skola24.se',
    'hultsfred.skola24.se',
    'hvilan.skola24.se',
    'hylte.skola24.se',
    'idrottsgymnasiet.skola24.se',
    'idrottsskolorna.skola24.se',
    'ies.skola24.se',
    'imanskolan.skola24.se',
    'ingridsegerstedt.skola24.se',
    'ingridskolan.skola24.se',
    'initcollege.skola24.se',
    'irisgruppen.skola24.se',
    'isgr.skola24.se',
    'issr.skola24.se',
    'it-gymnasiet.skola24.se',
    'itslearning.skola24.se',
    'jamtlandsgymnasium.skola24.se',
    'jarfalla.skola24.se',
    'jarnanaturbruk.skola24.se',
    'jenseneducation.skola24.se',
    'johannelund.skola24.se',
    'jokkmokk.skola24.se',
    'jonkoping.skola24.se',
    'jonkoping-sso.skola24.se',
    'josefinaskolan.skola24.se',
    'kalix.skola24.se',
    'kalmar.skola24.se',
    'karinboyeskolan.skola24.se',
    'karlsborg.skola24.se',
    'karlskoga.skola24.se',
    'karlskogafhsk.skola24.se',
    'karlskrona.skola24.se',
    'karlskrona-sso.skola24.se',
    'karlstad.skola24.se',
    'karlstad-personal.skola24.se',
    'karlstad-vardnadshavare.skola24.se',
    'katarinaskolan.skola24.se',
    'katrineholm.skola24.se',
    'katrineholm-sso.skola24.se',
    'kavlinge.skola24.se',
    'kil.skola24.se',
    'kil-foralder.skola24.se',
    'kil-sso.skola24.se',
    'kinda.skola24.se',
    'kinnarp.skola24.se',
    'kiruna.skola24.se',
    'kistaschool.skola24.se',
    'kitas.skola24.se',
    'klaragymnasium.skola24.se',
    'klippan.skola24.se',
    'koping.skola24.se',
    'kramfors.skola24.se',
    'krikabygdeskola.skola24.se',
    'kriminalvarden.skola24.se',
    'kristianstad.skola24.se',
    'kristianstad-extern.skola24.se',
    'kristinaskolan.skola24.se',
    'kristinehamn.skola24.se',
    'kristinehamnsfhsk.skola24.se',
    'kristnaskolan.skola24.se',
    'kristofferskolan.skola24.se',
    'krokom.skola24.se',
    'ksgyf.skola24.se',
    'ksgyf-sso.skola24.se',
    'ktrehab.skola24.se',
    'kubikskolan.skola24.se',
    'kullaviksmontessori.skola24.se',
    'kulturskolanraketen.skola24.se',
    'kumla.skola24.se',
    'kumla-sso.skola24.se',
    'kungalv.skola24.se',
    'kungalv-sso.skola24.se',
    'kungsbacka.skola24.se',
    'kungsor.skola24.se',
    'kunskapsforbundetvast.skola24.se',
    'kunskapsforbundetvast-sso.skola24.se',
    'kunskapsskolan.skola24.se',
    'kunskapsskolan-sso.skola24.se',
    'kvarnhjulet.skola24.se',
    'kvinnofhsk.skola24.se',
    'laholm.skola24.se',
    'laholm-foralder.skola24.se',
    'landskrona.skola24.se',
    'lapplandsgymnasium.skola24.se',
    'larlingsgymnasiet.skola24.se',
    'lavigruppen.skola24.se',
    'laxa.skola24.se',
    'lbskreativagymnasiet.skola24.se',
    'lekeberg.skola24.se',
    'leksand.skola24.se',
    'lel.skola24.se',
    'lemshaga.skola24.se',
    'lernia.skola24.se',
    'lerum.skola24.se',
    'lerum-bankid.skola24.se',
    'lessebo.skola24.se',
    'lhm.skola24.se',
    'lidkoping.skola24.se',
    'lillaakademien.skola24.se',
    'lillaedet.skola24.se',
    'lillerudsgymnasiet.skola24.se',
    'lindesberg.skola24.se',
    'lindgardsskolan.skola24.se',
    'linkoping.skola24.se',
    'linkoping-mobil.skola24.se',
    'ljungby.skola24.se',
    'ljungby-sso.skola24.se',
    'ljusdal.skola24.se',
    'ljusskolan.skola24.se',
    'lme.skola24.se',
    'lomma.skola24.se',
    'ludvika.skola24.se',
    'ludvika-mobil.skola24.se',
    'lulea.skola24.se',
    'lund.skola24.se',
    'lundsberg.skola24.se',
    'lundsmontessorigrundskola.skola24.se',
    'lund-sso.skola24.se',
    'lundutbildning.skola24.se',
    'lund-vardnadshavare.skola24.se',
    'lunnevadsfhsk.skola24.se',
    'lustlara.skola24.se',
    'lycksele.skola24.se',
    'lysekil.skola24.se',
    'magnetica.skola24.se',
    'mala.skola24.se',
    'malmenmontessori.skola24.se',
    'malmgruppen.skola24.se',
    'malmo.skola24.se',
    'malmomonterssori.skola24.se',
    'mandelaskolan.skola24.se',
    'margarethaskolan.skola24.se',
    'mariaelementar.skola24.se',
    'mariaskolan.skola24.se',
    'mariaskolanjarna.skola24.se',
    'marieborgsfhsk.skola24.se',
    'mariestad.skola24.se',
    'marinalaroverket.skola24.se',
    'mark.skola24.se',
    'markaryd.skola24.se',
    'markarydsfhsk.skola24.se',
    'markaryd-sso.skola24.se',
    'mark-sso.skola24.se',
    'martinskolan.skola24.se',
    'medleforsfhsk.skola24.se',
    'mellerud.skola24.se',
    'metapontum.skola24.se',
    'mikaelelias.skola24.se',
    'mikaelskolan.skola24.se',
    'mimersgymnasium.skola24.se',
    'mimerskolan.skola24.se',
    'mjolby.skola24.se',
    'molndal.skola24.se',
    'molndal-sso.skola24.se',
    'monsteras.skola24.se',
    'montessoridroppen.skola24.se',
    'montessorigsm.skola24.se',
    'montessoriskolancentrum.skola24.se',
    'montessoriskolanflodasateri.skola24.se',
    'montessoriskolanskaret.skola24.se',
    'montessoriskolanvaxholm.skola24.se',
    'montessoriskolanvaxthuset.skola24.se',
    'mora.skola24.se',
    'mora-foralder.skola24.se',
    'morapark.skola24.se',
    'motala.skola24.se',
    'movingers.skola24.se',
    'mubarakutbildning.skola24.se',
    'mullsjo.skola24.se',
    'munkedal.skola24.se',
    'munkedal-sso.skola24.se',
    'munkfors.skola24.se',
    'musikkonservatoriet.skola24.se',
    'musikugglan.skola24.se',
    'nacka.skola24.se',
    'nassjo.skola24.se',
    'naturlara.skola24.se',
    'nbg.skola24.se',
    'nftc.skola24.se',
    'nhskolan.skola24.se',
    'nora.skola24.se',
    'norberg.skola24.se',
    'nordanstig.skola24.se',
    'nordisktflygteknikcentrum.skola24.se',
    'norrastrandskolan.skola24.se',
    'norrkoping.skola24.se',
    'norrkoping-sso.skola24.se',
    'norrtalje.skola24.se',
    'norrtalje-sso.skola24.se',
    'norrviken.skola24.se',
    'norsjo.skola24.se',
    'novacentertaby.skola24.se',
    'novademo.skola24.se',
    'novamarknad.skola24.se',
    'novamontessori.skola24.se',
    'novas-adfs.skola24.se',
    'novas-azure.skola24.se',
    'novasoftwareexempel.skola24.se',
    'novasoftwareexempel-sso.skola24.se',
    'novasoftwaretest.skola24.se',
    'novas-ssaml.skola24.se',
    'ntigymnasiet.skola24.se',
    'ntm.skola24.se',
    'nvu.skola24.se',
    'nyalaroverket.skola24.se',
    'nyaskolan.skola24.se',
    'nybro.skola24.se',
    'nykoping.skola24.se',
    'nykopingsenskilda.skola24.se',
    'nykopingstrand.skola24.se',
    'nykvarn.skola24.se',
    'nynashamn.skola24.se',
    'ockelbo.skola24.se',
    'ockero.skola24.se',
    'ockero-sso.skola24.se',
    'odeshog.skola24.se',
    'ofhsk.skola24.se',
    'oknaskolan.skola24.se',
    'olinsgymnasiet.skola24.se',
    'olofstrom.skola24.se',
    'olympicaskolan.skola24.se',
    'onnestadsgymnasiet.skola24.se',
    'orebro.skola24.se',
    'orebro-elev.skola24.se',
    'orebro-personal.skola24.se',
    'orebrowaldorf.skola24.se',
    'orebro-vardnadshavare.skola24.se',
    'orjanskolan.skola24.se',
    'orkelljunga.skola24.se',
    'ornskoldsvik.skola24.se',
    'orsa.skola24.se',
    'orust.skola24.se',
    'orust-sso.skola24.se',
    'osby.skola24.se',
    'oskarshamn.skola24.se',
    'oskarshamn-personal.skola24.se',
    'osteraker.skola24.se',
    'osteraker-sso.skola24.se',
    'osteraker-vardnadshavare.skola24.se',
    'osterlensfhsk.skola24.se',
    'osthammar.skola24.se',
    'osthammar-sso.skola24.se',
    'ovanaker.skola24.se',
    'overkalix.skola24.se',
    'oxelosund.skola24.se',
    'pajala.skola24.se',
    'partille.skola24.se',
    'partille-sso.skola24.se',
    'peab.skola24.se',
    'piltradsskolan.skola24.se',
    'pitea.skola24.se',
    'plusgymnasiet.skola24.se',
    'popsacademy.skola24.se',
    'praktiska.skola24.se',
    'procivitas.skola24.se',
    'prolympianorr.skola24.se',
    'prolympiasyd.skola24.se',
    'pysslingen.skola24.se',
    'qvarnholmen.skola24.se',
    'ragnhildgymnasiet.skola24.se',
    'ragunda.skola24.se',
    'ralsen.skola24.se',
    'raoulwallenberg.skola24.se',
    'rattvik.skola24.se',
    'rattvik-sso.skola24.se',
    'realgymnasiet.skola24.se',
    'realgymnasiet-sso.skola24.se',
    'robertsfors.skola24.se',
    'romosseskolan.skola24.se',
    'ronneby.skola24.se',
    'ronnebyaktiveramobilapp.skola24.se',
    'rosholmen.skola24.se',
    'ryssbygymnasiet.skola24.se',
    'rytmus.skola24.se',
    'sabyholmsmontessori.skola24.se',
    'saffle.skola24.se',
    'saffle-eleg.skola24.se',
    'sala.skola24.se',
    'salem.skola24.se',
    'sallybauerskolan.skola24.se',
    'sameskolstyrelsen.skola24.se',
    'samskolan.skola24.se',
    'samskolan-mobil.skola24.se',
    'samskolan-vardnadshavare.skola24.se',
    'sandviken.skola24.se',
    'sandvikutbildning.skola24.se',
    'sanktamariaalsike.skola24.se',
    'sanktthomas.skola24.se',
    'sater.skola24.se',
    'sater-sso.skola24.se',
    'savsjo.skola24.se',
    'sbbfhsk.skola24.se',
    'sidsjofristaende.skola24.se',
    'sigtuna.skola24.se',
    'sigtuna-bankid.skola24.se',
    'siks.skola24.se',
    'simrishamn.skola24.se',
    'sjobo.skola24.se',
    'sjolins.skola24.se',
    'skapaskolan.skola24.se',
    'skara.skola24.se',
    'skara-bankid.skola24.se',
    'skara-mobil.skola24.se',
    'skargardsakersberga.skola24.se',
    'skarpnackfhsk.skola24.se',
    'skattkammaron.skola24.se',
    'skelleftea.skola24.se',
    'SKF.skola24.se',
    'skinnskatteberg.skola24.se',
    'skolanbergius.skola24.se',
    'skolfederation.skola24.se',
    'skovde.skola24.se',
    'skovde-foralder.skola24.se',
    'skovde-personal.skola24.se',
    'skurup.skola24.se',
    'smedjebacken.skola24.se',
    'snitz.skola24.se',
    'soderhamn.skola24.se',
    'soderhamnsfriskola.skola24.se',
    'soderkoping.skola24.se',
    'sodertalje.skola24.se',
    'sodertalje-sso.skola24.se',
    'sodertornsfriskola.skola24.se',
    'solleftea.skola24.se',
    'sollentuna.skola24.se',
    'solna.skola24.se',
    'solna-sso.skola24.se',
    'solvesborg.skola24.se',
    'solvesborg-bromolla.skola24.se',
    'solviksfhsk.skola24.se',
    'sophiaskolan.skola24.se',
    'sorsele.skola24.se',
    'sotenas.skola24.se',
    'sprakskolan.skola24.se',
    'spsm.skola24.se',
    'sshl.skola24.se',
    'staffanstorp.skola24.se',
    'stefanskolan.skola24.se',
    'stenbackeskolan.skola24.se',
    'stenungsund.skola24.se',
    'stenungsundsmontessori.skola24.se',
    'stenungsund-sso.skola24.se',
    'stiftelsenbmsl.skola24.se',
    'stiftelsenmikaeliskolan.skola24.se',
    'stockholmgymnasium.skola24.se',
    'stockholmsestetiska.skola24.se',
    'stockholmsstadsmission.skola24.se',
    'storuman.skola24.se',
    'strandskolan.skola24.se',
    'strangnas.skola24.se',
    'strangnasmontessori.skola24.se',
    'strombacksfolkhogskola.skola24.se',
    'strommanaturbruk.skola24.se',
    'stromsholm.skola24.se',
    'stromstad.skola24.se',
    'stromsund.skola24.se',
    'studiumyrgo.skola24.se',
    'sundbyberg.skola24.se',
    'sundsvall.skola24.se',
    'sunne.skola24.se',
    'support.skola24.se',
    'surahammar.skola24.se',
    'svalnasskola.skola24.se',
    'svalov.skola24.se',
    'svalovsmontessori.skola24.se',
    'sveaeducation.skola24.se',
    'svedala.skola24.se',
    'svenskaskolanfuengirola.skola24.se',
    'svenskaskolanlondon.skola24.se',
    'svenskaskolannairobi.skola24.se',
    'svenskaskolanparis.skola24.se',
    'sverigefinskaskolan.skola24.se',
    'sverigefinskaskolangbg.skola24.se',
    'sverigesridgymnasium.skola24.se',
    'svnaturbruk.skola24.se',
    'sydnarkesutbfb.skola24.se',
    'taby.skola24.se',
    'tabyfriskola.skola24.se',
    'tabyyrkesgymnasium.skola24.se',
    'tandlakarhogskolan.skola24.se',
    'tanum.skola24.se',
    'tanum-sso.skola24.se',
    'tarnafhsk.skola24.se',
    'tba.skola24.se',
    'tck.skola24.se',
    'theducation.skola24.se',
    'theenglishschool.skola24.se',
    'thorengruppen.skola24.se',
    'tibble.skola24.se',
    'tibro.skola24.se',
    'tibro-foralder.skola24.se',
    'tibro-personal.skola24.se',
    'tidaholm.skola24.se',
    'tidaholm-sso.skola24.se',
    'tierp.skola24.se',
    'tierp-old.skola24.se',
    'tillskararakademin.skola24.se',
    'timra.skola24.se',
    'tingsryd.skola24.se',
    'tingsryd-bankid.skola24.se',
    'tingsryd-sso.skola24.se',
    'tjorn.skola24.se',
    'tollarefhs.skola24.se',
    'tomelilla.skola24.se',
    'toreboda.skola24.se',
    'tornadoskolan.skola24.se',
    'torsas.skola24.se',
    'torsby.skola24.se',
    'tranas.skola24.se',
    'tranemo.skola24.se',
    'trelleborg.skola24.se',
    'trelleborg-sso.skola24.se',
    'trosa.skola24.se',
    'trosa-sso.skola24.se',
    'tvetafriskola.skola24.se',
    'tyreso.skola24.se',
    'uddevalla.skola24.se',
    'uddevalla-personal.skola24.se',
    'ulricehamn.skola24.se',
    'ulricehamn-sso.skola24.se',
    'umea.skola24.se',
    'umea-admin.skola24.se',
    'umea-elev.skola24.se',
    'umea-foralder.skola24.se',
    'umeawaldorfskola.skola24.se',
    'upplandsbro.skola24.se',
    'upplandsvasby.skola24.se',
    'uppsala.skola24.se',
    'uppsalamusikklasser.skola24.se',
    'uppsala-sso.skola24.se',
    'uppvidinge.skola24.se',
    'utbildia.skola24.se',
    'utbildningsinstitut.skola24.se',
    'utv.skola24.se',
    'utvardering.skola24.se',
    'utvarderingnxt.skola24.se',
    'utvecklingspedagogik.skola24.se',
    'vackstanas.skola24.se',
    'vadstena.skola24.se',
    'vaggeryd.skola24.se',
    'valdemarsvik.skola24.se',
    'wallbergsskolan.skola24.se',
    'vallentunafriskola.skola24.se',
    'vallentunagrundskola.skola24.se',
    'vallentunagymnasium.skola24.se',
    'vanergymnasiet.skola24.se',
    'vanersborg.skola24.se',
    'vannas.skola24.se',
    'vansbro.skola24.se',
    'vara.skola24.se',
    'varberg.skola24.se',
    'varberg-personal.skola24.se',
    'varberg-vardnadshavare.skola24.se',
    'varfru.skola24.se',
    'vargarda.skola24.se',
    'vargarda-sso.skola24.se',
    'varmdo.skola24.se',
    'varnamo.skola24.se',
    'varnamofhsk.skola24.se',
    'vasalundsskolan.skola24.se',
    'vasaskolangbg.skola24.se',
    'vasastansmontessori.skola24.se',
    'vastbergaskolan.skola24.se',
    'vasteras.skola24.se',
    'vasterasbibl.skola24.se',
    'vasterhaningemontessori.skola24.se',
    'vastraekoskolan.skola24.se',
    'vattenfallgymnasiet.skola24.se',
    'vaxholm.skola24.se',
    'vaxholm-adfs.skola24.se',
    'vaxholm-admin.skola24.se',
    'vaxholm-mobil.skola24.se',
    'vaxjo.skola24.se',
    'vaxjofria.skola24.se',
    'vaxjoislamiskaskola.skola24.se',
    'vaxjo-sso.skola24.se',
    'vaxjo-vardnadshavare.skola24.se',
    'vbu.skola24.se',
    'vellinge.skola24.se',
    'vesterhavsskolan.skola24.se',
    'vetlanda.skola24.se',
    'vfhs.skola24.se',
    'vgregion.skola24.se',
    'vgregionfhsk.skola24.se',
    'vgrfvm.skola24.se',
    'vibyfriskola.skola24.se',
    'vibyskolan.skola24.se',
    'victoriaskolan.skola24.se',
    'videdalsprivatskolor.skola24.se',
    'viktoriaskolanorebro.skola24.se',
    'viktorrydbergsskolor.skola24.se',
    'wilhelmhaglundsgy.skola24.se',
    'vilhelmina.skola24.se',
    'vimmerby.skola24.se',
    'vindeln.skola24.se',
    'vingaker.skola24.se',
    'virestad.skola24.se',
    'visiblecare.skola24.se',
    'vittra.skola24.se',
    'volvogymnasiet.skola24.se',
    'vuxenskolan.skola24.se',
    'ydre.skola24.se',
    'yoma.skola24.se',
    'ystad.skola24.se',
    'zulu01.skola24.se',
    'zulu02.skola24.se',
    'zulu03.skola24.se',
    'zulu04.skola24.se',
    'zulu05.skola24.se',
    'zulu06.skola24.se',
    'zulu07.skola24.se',
    'zulu08.skola24.se',
  ];

  const [lessons, setLessons] = React.useState<any[]>([]);

  const greenHover = {
    ':hover': {
      bgcolor: '#247E24', // theme.palette.primary.main
      color: 'white',
    },
  };

  React.useEffect(() => {
    chrome.storage.sync.get('scheduleSettings', function (result) {
      console.log(result);
      if (result.scheduleSettings) {
        setSelectedHostName(result.scheduleSettings.hostName);
        setSelectedSchool(result.scheduleSettings.school);
        setSelectedClass(result.scheduleSettings.class);
      }
    });
    chrome.storage.sync.get('scheduleHiddenLessons', function (result) {
      if (result.scheduleHiddenLessons) {
        setLessons(result.scheduleHiddenLessons);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!selectedHostName) return;
    fetch(
      `https://tools-proxy.leonhellqvist.workers.dev?service=skola24&subService=getSchools&hostName=${selectedHostName}`,
    ).then(async response => {
      let schools = await response.json();
      schools = schools.data.getTimetableViewerUnitsResponse.units;
      let schoolsFormated: any[] = [];
      for (let i = 0; i < schools.length; i++) {
        schoolsFormated.push({
          label: schools[i].unitId,
          unitGuid: schools[i].unitGuid,
        });
      }
      setSchools(schoolsFormated);
      fetch(
        `https://tools-proxy.leonhellqvist.workers.dev?service=skola24&subService=getActiveSchoolYears&hostName=${selectedHostName}`,
      ).then(async response => {
        let activeSchoolYears = await response.json();
        console.log(activeSchoolYears);
        activeSchoolYears = activeSchoolYears.data.activeSchoolYears[0].guid;
        setSelectedSchoolYear(activeSchoolYears);
      });
    });
  }, [selectedHostName]);

  React.useEffect(() => {
    if (selectedSchool == null) return;
    fetch(
      `https://tools-proxy.leonhellqvist.workers.dev?service=skola24&subService=getClasses&hostName=${selectedHostName}&unitGuid=${selectedSchool.unitGuid}`,
    ).then(async response => {
      let classes = await response.json();
      classes = classes.data.classes;
      let classesFormated: any[] = [];
      for (let i = 0; i < classes.length; i++) {
        classesFormated.push({
          label: classes[i].groupName,
          groupGuid: classes[i].groupGuid,
        });
      }
      setClasses(classesFormated);
    });
  }, [selectedSchool]);

  const handleHostNameChange = (value: any) => {
    setSelectedHostName(value);
    setSelectedSchool(null);
    setSelectedClass(null);
    chrome.storage.sync.set(
      {
        scheduleSettings: {
          hostName: null,
          schoolYear: null,
          school: null,
          class: null,
        },
      },
      () => {
        console.log('Saved food settings');
      },
    );
  };

  const handleSchoolChange = (value: any) => {
    setSelectedSchool(value);
    setSelectedClass(null);
    chrome.storage.sync.set(
      {
        scheduleSettings: {
          hostName: null,
          schoolYear: null,
          school: null,
          class: null,
        },
      },
      () => {
        console.log('Saved food settings');
      },
    );
  };

  const handleClassChange = (value: any) => {
    setSelectedClass(value);
    if (value == null) {
      chrome.storage.sync.set(
        {
          scheduleSettings: {
            hostName: null,
            schoolYear: null,
            school: null,
            class: null,
          },
        },
        () => {
          console.log('Saved food settings');
        },
      );
    } else {
      chrome.storage.sync.set(
        {
          scheduleSettings: {
            hostName: selectedHostName,
            schoolYear: selectedSchoolYear,
            school: selectedSchool,
            class: value,
          },
        },
        () => {
          console.log('Saved food settings');
          console.log('YEAR: ' + selectedSchoolYear);
        },
      );
    }
  };

  const handleRemoveHiddenLesson = (guidId: string) => {
    let lessonsTemp = lessons;
    lessonsTemp = lessonsTemp.filter((lesson: any) => lesson.guidId != guidId);
    setLessons(lessonsTemp);
    chrome.storage.sync.set({
      scheduleHiddenLessons: lessonsTemp,
    });
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
        Schema
      </Typography>
      <Paper elevation={3} sx={{ width: '100%', height: '100%', paddingBottom: 2 }}>
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={0}>
          <Paper sx={{ padding: 2, marginRight: 1, marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Välj ditt hostname
            </Typography>
            <Autocomplete
              id="hostname"
              options={hostNames}
              value={selectedHostName}
              onChange={(event, value) => handleHostNameChange(value)}
              sx={{ width: 300 }}
              renderInput={params => <TextField {...params} label="Hostname" />}
            />
          </Paper>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
            <Paper sx={{ padding: 2, marginRight: 1, marginTop: 2 }}>
              <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
                Välj din skola
              </Typography>
              <Autocomplete
                id="school"
                options={schools}
                value={selectedSchool}
                isOptionEqualToValue={(option, value) => option.unitGuid === value.unitGuid}
                onChange={(event, value: any) => handleSchoolChange(value)}
                sx={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Skola" />}
              />
            </Paper>
            <Paper sx={{ padding: 2, marginLeft: 1, marginTop: 2 }}>
              <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
                Välj din klass
              </Typography>
              <Autocomplete
                id="class"
                options={classes}
                value={selectedClass}
                isOptionEqualToValue={(option, value) => option.groupGuid === value.groupGuid}
                onChange={(event, value: any) => handleClassChange(value)}
                sx={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Klass" />}
              />
            </Paper>
          </Stack>
          <Paper sx={{ padding: 2, marginLeft: 1, marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'center' }}>
              Gömda lektioner
            </Typography>
            <Stack
              sx={{
                maxHeight: '200px',
                overflowY: 'scroll',
              }}
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}>
              {lessons.map((lesson: any, lessonIndex: number) => {
                return (
                  <div key={lessonIndex} style={{ scrollMargin: 40 }}>
                    <Zoom in={true} style={{ transitionDelay: `${1 * 200}ms` }}>
                      <Paper
                        style={{ textAlign: 'left', height: '100%' }}
                        elevation={0}
                        sx={greenHover}
                        onClick={() => handleRemoveHiddenLesson(lesson.guidId)}>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          sx={{ height: '100%', width: '100%' }}>
                          <Box
                            sx={{
                              marginRight: 1,
                              marginLeft: 0.5,
                              width: '3px',
                              height: '100%',
                            }}
                          />
                          <Box sx={{ padding: 1, width: '300px', overflow: 'hidden' }}>
                            {lesson.texts.map((item: any, index: number, length: any) => {
                              return index != length.length - 1 ? (
                                <Typography key={index} variant="body1" component="div">
                                  {item}
                                </Typography>
                              ) : (
                                <Stack
                                  key={index}
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={2}
                                  sx={{ width: '100%' }}>
                                  <Typography variant="body1" component="div">
                                    {item}
                                  </Typography>
                                  <Typography variant="body1" component="div" sx={{ paddingRight: 1 }}>
                                    {lesson.timeStartU} - {lesson.timeEndU}
                                  </Typography>
                                </Stack>
                              );
                            })}
                          </Box>
                        </Stack>
                      </Paper>
                    </Zoom>
                  </div>
                );
              })}
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Schedule;

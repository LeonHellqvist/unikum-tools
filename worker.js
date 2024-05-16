// src/index.ts
var src_default = {
  async fetch(request, env, ctx) {
    const responseHeaders = new Headers();
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');
    if (service == 'skolmaten') {
      const subService = searchParams.get('subService');
      if (subService == 'stations') {
        const rss = await fetch(`https://skolmaten.se/api/4/stations/index/`, {
          headers: {
            accept: '*/*',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'api-version': '4.0',
            'client-token': 'web',
            'client-version-token': 'web',
            locale: 'sv_SE',
            'sec-ch-ua': 'Cloudflare Worker',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
          },
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const res = await rss.text();
        responseHeaders.set('Content-type', 'application/json;charset=UTF-8');
        responseHeaders.set('Chache-Control', 'max-age=28800');
        return new Response(res, { status: 200, headers: responseHeaders });
      }
      if (subService == 'menu') {
        const school = searchParams.get('school');
        const year = searchParams.get('year');
        const week = searchParams.get('week');
        if (!school) return new Response('Saknar skola', { status: 400 });
        const rss = await fetch(
          `https://skolmaten.se/api/4/menu/?station=${school}&year=${year}&weekOfYear=${week}&count=1`,
          {
            headers: {
              accept: '*/*',
              'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
              'api-version': '4.0',
              'client-token': 'web',
              'client-version-token': 'web',
              locale: 'sv_SE',
              'sec-ch-ua': 'Cloudflare Worker',
              'sec-ch-ua-mobile': '?0',
              'sec-ch-ua-platform': '"Linux"',
              'sec-fetch-dest': 'empty',
              'sec-fetch-mode': 'cors',
              'sec-fetch-site': 'same-origin',
            },
            cf: { cacheTtl: 28800, cacheEverything: true },
          },
        );
        const res = await rss.text();
        responseHeaders.set('Content-type', 'application/json;charset=UTF-8');
        responseHeaders.set('Chache-Control', 'max-age=28800');
        return new Response(res, { status: 200, headers: responseHeaders });
      }
    }
    if (service == 'skola24') {
      const subService = searchParams.get('subService');
      if (subService == 'getActiveSchoolYears') {
        const hostName = searchParams.get('hostName');
        if (!hostName) return new Response('Saknar hostName (ex katrineholm.skola24.se)', { status: 400 });
        const res = await fetch('https://web.skola24.se/api/services/skola24/get/timetable/viewer/years', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': 'Cloudflare Worker',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: `{"checkSchoolYearsFeatures": false, "hostName":"${hostName}"}`,
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const result = await res.text();
        return new Response(result, { status: 200, headers: responseHeaders });
      }
      if (subService == 'getSchools') {
        const hostName = searchParams.get('hostName');
        if (!hostName) return new Response('Saknar hostName (ex katrineholm.skola24.se)', { status: 400 });
        const res = await fetch('https://web.skola24.se/api/services/skola24/get/timetable/viewer/units', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': 'Cloudflare Worker',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: `{"getTimetableViewerUnitsRequest":{"hostName":"${hostName}"}}`,
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const result = await res.text();
        return new Response(result, { status: 200, headers: responseHeaders });
      }
      if (subService == 'getClasses') {
        const hostName = searchParams.get('hostName');
        const unitGuid = searchParams.get('unitGuid');
        if (!unitGuid)
          return new Response('Saknar schoolId (ex ZGI0OGY4MjktMmYzNy1mMmU3LTk4NmItYzgyOWViODhmNzhj)', { status: 400 });
        const res = await fetch('https://web.skola24.se/api/get/timetable/selection', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: `{"hostName":"${hostName}","unitGuid":"${unitGuid}","filters":{"class":true,"course":false,"group":false,"period":false,"room":false,"student":false,"subject":false,"teacher":false}}`,
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const result = await res.text();
        return new Response(result, { status: 200, headers: responseHeaders });
      }
      if (subService == 'getTeachers') {
        const hostName = searchParams.get('hostName');
        const unitGuid = searchParams.get('unitGuid');
        if (!unitGuid)
          return new Response('Saknar schoolId (ex ZGI0OGY4MjktMmYzNy1mMmU3LTk4NmItYzgyOWViODhmNzhj)', { status: 400 });
        const res = await fetch('https://web.skola24.se/api/get/timetable/selection', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: `{"hostName":"${hostName}","unitGuid":"${unitGuid}","filters":{"class":false,"course":false,"group":false,"period":false,"room":false,"student":false,"subject":false,"teacher":true}}`,
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const result = await res.text();
        return new Response(result, { status: 200, headers: responseHeaders });
      }
      if (subService == 'getLessons') {
        const hostName = searchParams.get('hostName');
        const schoolYear = searchParams.get('schoolYear');
        const unitGuid = searchParams.get('unitGuid');
        const groupGuid = searchParams.get('groupGuid');
        const year = searchParams.get('year');
        const week = searchParams.get('week');
        const scheduleDay = searchParams.get('scheduleDay');
        let selectionType = searchParams.get('selectionType');
        let width = searchParams.get('width');
        let height = searchParams.get('height');
        let lines = searchParams.get('lines');
        if (!hostName) return new Response('Saknar hostName (ex katrineholm.skola24.se)', { status: 400 });
        if (!schoolYear) return new Response('Saknar schoolYear', { status: 400 });
        if (!unitGuid)
          return new Response('Saknar schoolId (ex ZGI0OGY4MjktMmYzNy1mMmU3LTk4NmItYzgyOWViODhmNzhj)', { status: 400 });
        if (!groupGuid)
          return new Response('Saknar groupId (ex ZGI0OGY4MjktMmYzNy1mMmU3LTk4NmItYzgyOWViODhmNzhj)', { status: 400 });
        if (!year) return new Response('Saknar year (ex 2019)', { status: 400 });
        if (!week) return new Response('Saknar week (ex 1)', { status: 400 });
        if (!scheduleDay) return new Response('Saknar scheduleDay (ex 1)', { status: 400 });
        if (!selectionType) {
          selectionType = 0;
        }
        if (!width) {
          width = 615;
        }
        if (!height) {
          height = 550;
        }
        if (!lines) {
          lines = 'false';
        }
        const keyReq = await fetch('https://web.skola24.se/api/get/timetable/render/key', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': 'Cloudflare Worker',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: 'null',
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        let key = await keyReq.json();
        key = key.data.key;
        const lessons = await fetch('https://web.skola24.se/api/render/timetable', {
          headers: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7',
            'content-type': 'application/json',
            'sec-ch-ua': 'Cloudflare Worker',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Linux"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest',
            'x-scope': '8a22163c-8662-4535-9050-bc5e1923df48',
          },
          body: `{"renderKey":"${key}","host":"${hostName}","schoolYear":"${schoolYear}","unitGuid":"${unitGuid}","startDate":null,"endDate":null,"scheduleDay":${scheduleDay},"blackAndWhite":false,"width":${width},"height":${height},"selectionType":${selectionType},"selection":"${groupGuid}","showHeader":false,"periodText":"","week":${week},"year":${year},"privateFreeTextMode":null,"privateSelectionMode":false,"customerKey":""}`,
          method: 'POST',
          cf: { cacheTtl: 28800, cacheEverything: true },
        });
        const result = await lessons.text();
        const json = JSON.parse(result);
        let lessonsJson;
        if (lines == 'true') {
          lessonsJson = {
            boxList: json.data.boxList,
            lessonInfo: json.data.lessonInfo,
            lineList: json.data.lineList,
            textList: json.data.textList,
          };
        } else {
          lessonsJson = { boxList: json.data.boxList, lessonInfo: json.data.lessonInfo };
        }
        const lessonText = JSON.stringify(lessonsJson);
        return new Response(lessonText, { status: 200, headers: responseHeaders });
      }
      return new Response('Finns inte \xE4n', { status: 400, headers: responseHeaders });
    }
    return new Response('"Service" m\xE5ste vara "skola24" eller "skolmaten"', {
      status: 400,
      headers: responseHeaders,
    });
  },
};
export { src_default as default };
//# sourceMappingURL=index.js.map

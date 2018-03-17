((window) => {
  let now = moment()

  // JSON DATA
  let schedule = [
    {
      date: now,
      agenda: [
        { range: ['11:00', '12:59'], display: { h: '12:', m: '00', a: 'pm' }, location: '', desc: 'Hacking begins!' },
        { range: ['13:00', '13:40'], display: { h: '1:', m: '00', a: 'pm' }, location: '', desc: 'Macy workshop' },
        { range: ['13:41', '14:30'], display: { h: '1:', m: '50', a: 'pm' }, location: '', desc: 'Introduction to IBM Watson' },
        { range: ['14:31', '15:20'], display: { h: '2:', m: '40', a: 'pm' }, location: '', desc: 'Introduction to Twilio API' },
        { range: ['15:21', '16:10'], display: { h: '3:', m: '30', a: 'pm' }, location: '', desc: 'Google Cloud Platform Workshop' },
        { range: ['16:11', '17:00'], display: { h: '4:', m: '20', a: 'pm' }, location: '', desc: '' },
        { range: ['17:01', '17:50'], display: { h: '5:', m: '10', a: 'pm' }, location: '', desc: 'David Chow' },
        { range: ['17:51', '20:00'], display: { h: '7:' , m: '00', a: 'pm' }, location: '', desc: 'Dinner!' },
        { range: ['20:01', '30:59'], display: { h: '', m: '', a: '' }, location: '', desc: 'Hacking continues' },
        { range: ['31:00', '33:00'], display: { h: '8:', m: '00', a: 'am' }, location: '', desc: 'Breakfast' },
        { range: ['33:01', '48:00'], display: { h: '12:', m: '00', a: 'am' }, location: '', desc: 'Hacking ends!' }
      ]
    }
  ]

  let timeFromNum = (num, sep, ampm) => {
    let hh = parseInt(num)
    let mm = Math.round((num - hh) * 60)
    sep = sep || ''
    return (hh > 24 && ampm ? hh : hh) + sep + ('00' + mm).substr(-2) + (ampm ? (hh > 11 ? ' pm' : ' am') : '')
  }

  let numFromTime = (time) => {
    let set = time.split(/[.:]/)
    let hh = parseInt(set[0])
    let mm = set[1] ? parseInt(set[1]) : 0
    return parseFloat((hh + mm / 60).toFixed(1))
  }

  let app = new Vue({
    el: 'aside',
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      time: moment().format('h:mm a'),
      showTimeTraveller: false
    }
  })

  let sked = new Vue({
    el: 'main',
    filters: {
      date: function (date) {
        return date.format('ddd, MMM D');
      }
    },
    data: {
      now: numFromTime(moment(now).format('HH:mm')),
      schedule: schedule
    },
    methods: {
      checkTime: function (ts, te) {
        return (this.now >= numFromTime(ts) && this.now < numFromTime(te))
      }
    }
  })

  let setClockPos = () => {
    setTimeout(() => {
      let anchor = document.querySelector('.current')
      let t = '1em'
      if (anchor) {
        t = Math.round(anchor.getBoundingClientRect().top) + 'px'
      }
      document.documentElement.style.setProperty('--y', t)
    }, 350)
  }

  let timeTraveler

  let setTime = function () {
    let now = moment()
    app.now = sked.now = numFromTime(moment(now).format('HH:mm'))
    app.time = moment(now).format('h:mm a')
  }

  let runTimer = () => {
    setClockPos()
    timeTraveler = setInterval(function () {
      setTime()
    }, 30000)
  }

  runTimer()

  document.querySelector('#traveler').addEventListener('input', (e) => {
    app.time = timeFromNum(e.target.value, ':', true)
    sked.now = e.target.value
    setClockPos()
    clearInterval(timeTraveler)
  }, false)

  document.querySelector('.control header').addEventListener('click', (e) => {
    setTime()
    runTimer()
  }, false)

  let randum = function (min, max) {
    return Math.round((Math.random() * min) + (Math.random() * max));
  }

  let randex = function () {
    return '#' + ('00' + Math.floor(Math.random() * 16777216).toString(16)).substr(-6)
  }

  // let colorizer = () => {
  //   let hex = randex()
  //   let reverseHex = '#' + hex.replace('#', '').split("").reverse().join("")
  //   document.documentElement.style.setProperty('--bg', hex)
  //   document.documentElement.style.setProperty('--accent', reverseHex)
  // }

  let transformer = () => {
    document.documentElement.style.setProperty('--transform', 'translate(-50%, -50%) rotate(' + randum(-360, 360) + 'deg)');
  }

  setTimeout(() => {
    // colorizer()
  }, 1000)

  setTimeout(() => {
    transformer()
  }, 100)

  let adventureTime = window.setInterval(function () {
    // colorizer()
  }, 7500);

  let partyTime = window.setInterval(function () {
    transformer()
  }, 12000);

  // resize capture
  let resizeTimer
  window.addEventListener('resize', (e) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setClockPos()
    }, 60);
  }, false)

})(window)
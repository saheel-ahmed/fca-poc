const { createApp } = Vue

  createApp({
    data() {
      return {
        db: {
            priorities: [],
            enabler: []
        },
        objectiveMode: 'view',
        objective: {
            oIndex: 0,
            pIndex: 0,
            code: '',
            title: '',
            description: '',
            kpi: [],
            ini: [],
            result1: 0,
            result2: 0
        }
      }
    },
    created () {
        this.fetchData();
    },
    methods: {
        fetchData : function () {
            let _self = this;
            $.getJSON('./data.json', function (response) {
                _self.db = response;
            });
        },
        fnAddObjective : function (pIndex) {
            this.objective.pIndex = pIndex;
            $('#objPopup').modal('show');
        },
        fnSaveObjective: function () {
            var pIndex = this.objective.pIndex;
            var newData = {
                "code": 'OBJ'+ (this.db.priorities[pIndex].objectives.length+1),
                "title": this.objective.title,
                "description": this.objective.description,
                "kpi": [],
                "ini": []
            };
            this.db.priorities[pIndex].objectives.push(newData);
            $('#objPopup').modal('hide');
            $.toaster({ message : 'Success added', title : 'Success', priority : 'success' });
            // rest objective
            this.objective = {
                oIndex: 0,
                pIndex: 0,
                code: '',
                title: '',
                description: '',
                kpi: [],
                ini: [],
                result1: 0,
                result2: 0
            };
        },
        fnViewObjective : function (pIndex, oIndex) {
            this.objective = this.db.priorities[pIndex].objectives[oIndex];
            this.objective.oIndex = oIndex;
            this.objective.pIndex = pIndex;
            this.objective.result1 = 0;
            this.objective.result2 = 0;
            var obj = this.objective;
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            console.log('actualSum', actualSum);
            var rstPercent = Math.round( ( actualSum / total ) * 100 );
            console.log('rstPercent', rstPercent);
            this.objective.result1 = isNaN(rstPercent) ? 0 : rstPercent;
            this.objective.result2 = isNaN(rstPercent) ? 0 : (100 - rstPercent);

            $('#priorityPopup').modal('show');
        },
        fnCalc : function () {
            this.objective.result1 = 0;
            this.objective.result2 = 0;
            var obj = this.objective;
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            console.log('actualSum', actualSum);
            var rstPercent = Math.round( ( actualSum / total ) * 100 );
            console.log('rstPercent', rstPercent);
            this.objective.result1 = isNaN(rstPercent) ? 0 : rstPercent;
            this.objective.result2 = isNaN(rstPercent) ? 0 : (100 - rstPercent);
        },
        checkPercentage: function(obj){
            //((D3+D4+H3+H4) ) / (4*100) * 100
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            var rstPercent = Math.round( ( actualSum / total ) * 100 )
            return (isNaN(rstPercent)? 0 : rstPercent) +'%';
        },
        fnAddKPI: function (type) {
            
            if (type == 'KPI') {
                var kpiLen = this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].kpi.length;
                var newData = 
                {
                    "code": "KPI" + (kpiLen+1),
                    "title": "Title of KPI" + (kpiLen+1),
                    "description": "The KPI measures the percentage completion of Integrated Case Management set-up",
                    "expected": 99,
                    "actual": (Math.floor(Math.random() * 31) + 50)
                };
                this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].kpi.push(newData);
            } else if (type == 'INIT') {
                var kpiLen = this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].ini.length;
                var newData = {
                    "code": "INI" + (kpiLen+1),
                    "title": "Title of Initiative " + (kpiLen+1),
                    "description": "The KPI measures the percentage completion of Integrated Case Management set-up",
                    "expected": 99,
                    "actual": (Math.floor(Math.random() * 31) + 50)
                };
                this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].ini.push(newData);
            }
            this.fnCalc();
        },
        fnRemoveKPI : function (kIndex,  targetObj){
            targetObj.splice(kIndex, 1);
            this.fnCalc();
        } 
    }
  }).mount('#app');

  $(document).ready(function(){

    var triangle = $('.triangle');
    var setBoarderWidth =  Math.round($(triangle).parent().width() / 2);
    var triangleCss = {
        'border': setBoarderWidth+'px solid transparent',
        'border-top': 0,
        'border-bottom': '80px solid rgb(231, 231, 231)'
    };
    $(triangle).css(triangleCss);

    $( window ).resize(function() {
        var setBoarderWidth =  $(triangle).parent().width() / 2;
        var triangleCss = {
            'border': setBoarderWidth+'px solid transparent',
            'border-top': 0,
            'border-bottom': '80px solid rgb(231, 231, 231)'
        };
        $(triangle).css(triangleCss);
    });

  });
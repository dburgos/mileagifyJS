describe("MileagifyJS", function() {
  it("should be defined", function() {
    expect(mileagifyJS).toBeDefined();
  });
});

describe("MileagifyJS Config module", function() {
  it("should be defined", function() {
    expect(mileagifyJS.config).toBeDefined();
  });
  describe("Unit system", function() {
    it("should be METRIC or IMPERIAL", function() {
        expect(mileagifyJS.config.unit_system).toBe('METRIC' || 'IMPERIAL');
    });
    it("anything else should be wrong", function() {
        expect("example").not.toBe('METRIC' || 'IMPERIAL');
    });
  });
  describe("Region", function() {
    it("should be defined", function() {
        expect(mileagifyJS.config.region).toBeDefined();
        expect(mileagifyJS.config.region).toBeTruthy();
    });
  });
  describe("Average consumption", function() {
    it("should be defined", function() {
        expect(mileagifyJS.config.avg_consumption).toBeDefined();
        expect(mileagifyJS.config.avg_consumption).toBeTruthy();
    });
    it("should be a valid number", function() {
        expect(mileagifyJS.config.avg_consumption).toBeGreaterThan(0);
    });
  });
  describe("Price fuel", function() {
    it("should be defined", function() {
        expect(mileagifyJS.config.price_fuel).toBeDefined();
        expect(mileagifyJS.config.price_fuel).toBeTruthy();
    });
    it("should be a valid number", function() {
        expect(mileagifyJS.config.price_fuel).toBeGreaterThan(0);
    });
  });
});

describe("MileagifyJS Map module", function() {
  it("should be defined", function() {
    expect(mileagifyJS.map).toBeDefined();
  });
  describe("Map object", function() {
    it("should be defined", function() {
        expect(mileagifyJS.map.object).toBeDefined();
    });
  });
  describe("Render()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.map.render).toBeDefined();
    });
  });
  describe("isValidCoords()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.map.isValidCoords).toBeDefined();
    });
    it("should validate right coords", function() {
        expect(mileagifyJS.map.isValidCoords(-4.56,54.93)).toBeTruthy();
    });
    it("should don't validate wrong coords", function() {
        expect(mileagifyJS.map.isValidCoords(-214.56,54.93)).not.toBeTruthy();
    });
  });
  describe("getLocation()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.map.getLocation).toBeDefined();
    });
  });
  describe("text2LatLng()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.map.text2LatLng).toBeDefined();
    });
    it("should decode Madrid into latlng coords", function() {
        var coords = null;
        mileagifyJS.map.text2LatLng("madrid", function(err, data) {
          coords = data;
        });
        waitsFor(function() {
            return coords != null;
        }, "It took too long to decode text into latlng coords", 5000);

        runs(function() {
            expect(coords).toBeTruthy();
        });
    });
  });
});

describe("MileagifyJS Route module", function() {
  it("should be defined", function() {
    expect(mileagifyJS.route).toBeDefined();
  });
  describe("setFrom()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.setFrom).toBeDefined();
    });
  });
  describe("setTo()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.setTo).toBeDefined();
    });
  });
  describe("eco", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.eco).toBeDefined();
    });
    it("should has render() defined", function() {
        expect(mileagifyJS.route.eco.render).toBeDefined();
    });
  });
  describe("gmDefault", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.gmDefault).toBeDefined();
    });
    it("should has render() defined", function() {
        expect(mileagifyJS.route.gmDefault.render).toBeDefined();
    });
  });
  describe("directionsDisplay", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.directionsDisplay).toBeDefined();
    });
  });
  describe("getFuelStat()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.getFuelStat).toBeDefined();
    });
    it("should return a valid number", function() {
        expect(mileagifyJS.route.getFuelStat(5000)).toBeGreaterThan(0);
    });
  });
  describe("getCO2Stat()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.getCO2Stat).toBeDefined();
    });
    it("should return a valid number", function() {
        expect(mileagifyJS.route.getCO2Stat(20)).toBeGreaterThan(0);
    });
  });
  describe("getMoneyStat()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.getMoneyStat).toBeDefined();
    });
    it("should return a valid number", function() {
        expect(mileagifyJS.route.getMoneyStat(20)).toBeGreaterThan(0);
    });
  });
  describe("showDirections()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.showDirections).toBeDefined();
    });
  });
  describe("calculate()", function() {
    it("should be defined", function() {
        expect(mileagifyJS.route.calculate).toBeDefined();
    });
    it("should return the routes", function() {
        var result = null;
        mileagifyJS.route.calculate("los angeles", "new york", function(err, data) {
          result = data;
        });
        waitsFor(function() {
            return result != null;
        }, "It took too long to calculate", 10000);

        runs(function() {
            expect(result).toBeTruthy();
            expect(result.eco_m).toBeTruthy();
        });
    });
  });
});
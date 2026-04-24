$(document).ready(function () { 
  function loadData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: "data.json",
        dataType: "json",
        success: function (response) {
          resolve(response);
        },
        error: function (xhr, status, error) {  
          reject(error);
        }
      });
    })
  };

  loadData()
  .then(function (response) {
      // Logic untuk halaman Service
      var serviceList = $("#service_list");
      if(serviceList.length) {
          var services = response.data.service;
          services.forEach(function (service) {
            let serviceCard = `
            <div class="col-md-6">
              <div class="card service-card">
                <img src="${service.servicePictureUrl}" alt="${service.title}" />
                <div class="card-body text-center">
                  <h3 class="card-title fw-bold">${service.title}</h3>
                  <p class="card-text text-muted">${service.description}</p>
                </div>
              </div>
            </div>`;
            serviceList.append(serviceCard);
          });
      }

      // Logic untuk halaman Pricing
      var priceList = $("#price_list");
      if(priceList.length) {
          var prices = response.data.pricing;
          prices.forEach(function (price) {
            let priceCard = `
            <div class="col-md-4">
              <div class="pricing_item">
                <img src="${price.pricingPictureUrl}" alt="${price.title}" />
                <h3>${price.title}</h3>
                <p>${price.price}</p>
              </div>
            </div>`;
            priceList.append(priceCard);
          });
      }
  })
  .catch(function (error) {
      console.error("Error loading data:", error);
  });
});
// NE FONCTIONNE PAS TRES BIEN

// Impression
let printControl = new ol.control.PrintDialog();
printControl.setSize('A4');
map.addControl(printControl);

/* On print > save image file */
printControl.on(['print', 'error'], function(e) {
  // map.removeControl(mousePositionControl);
  console.log('vvv')
  console.log(e)

    // Print success
    if (e.image) {
      if (e.pdf) {
        // Export pdf using the print info
        var pdf = new jsPDF({
          orientation: e.print.orientation,
          unit: e.print.unit,
          format: e.print.size,
          // title: e.print.title
        });
        pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
        pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
      }
      else  {
        // Save image as file
        e.canvas.toBlob(function(blob) {
          var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
          saveAs(blob, name);
        }, e.imageType, e.quality);
      }
    } else {
      console.warn('No canvas to export');
    }
  });

function statistic(dico_mes){
    countSessionGNSS = dico_mes['gnss']['features'].length
    countStationnTerrestre = dico_mes['terrestre']['features'].length
    
}
    
    
    // // Legend
    // var legend = new ol.legend.Legend({ 
    //     title: 'Legend', 
    //     margin: 5,
    //     items: [{
    //       title: 'Church', 
    //       typeGeom: 'Point', 
    //       style: new ol.style.Style({ 
    //         image: new ol.style.Icon({ 
    //         src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Eglise_icone_2.svg/30px-Eglise_icone_2.svg.png',
    //         crossOrigin: 'anonymous' // Enable print
    //       })})
    //     }, { 
    //       title: 'Photo', 
    //       typeGeom: 'Point', 
    //       style: new ol.style.Style({ 
    //         image: new ol.style.Icon({ 
    //         src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Icone_appareil_photo.svg/30px-Icone_appareil_photo.svg.png',
    //         crossOrigin: 'anonymous' // Enable print
    //       })})
    //     }, {
    //       title: 'Line', typeGeom: 'LineString', style: ol.style.Style.defaultStyle() 
    //     }, {
    //       title: 'Polygon', typeGeom: 'Polygon', style: ol.style.Style.defaultStyle() 
    //     }]
    //   });
  
    //   ol.control.PrintDialog.prototype.formats = [{
    //     title: 'Copier dans le presse-papier',
    //     imageType: 'image/png',
    //     clipboard: true
    //   }, {
    //     title: 'Enregistrer en jpeg (qualité supérieure)',
    //     imageType: 'image/jpeg',
    //     quality: .8
    //   }, {
    //     title: 'Enregistrer en jpeg (qualité maximale)',
    //     imageType: 'image/jpeg',
    //     quality: 1
    //   }, {
    //     title: 'Enregistrer en png',
    //     imageType: 'image/png',
    //     quality: .92
    //   }, {
    //     title: 'Enregistrer en pdf',
    //     imageType: 'image/jpeg',
    //     quality: .92,
    //     pdf: true
    //   }
    // ];
    // // Control
    // var legendCtrl = new ol.control.Legend({ legend: legend });
    // map.addControl(legendCtrl);
  
    // // ScaleLine
    // map.addControl(new ol.control.CanvasScaleLine());
  
    // // Print control
    // // var printControl = new ol.control.PrintDialog({ lang: 'fr' });
    // // printControl.setSize('A4');
    // // map.addControl(printControl);
    // let printControl = new ol.control.PrintDialog();
    // printControl.setSize('A4');
    // map.addControl(printControl);

    // /* On print > save image file */
    // printControl.on(['print', 'error'], function(e) {
    //   // Print success
    //   if (e.image) {
    //     if (e.pdf) {
    //       // Export pdf using the print info
    //       var pdf = new jsPDF({
    //         orientation: e.print.orientation,
    //         unit: e.print.unit,
    //         format: e.print.size
    //       });
    //       pdf.addImage(e.image, 'JPEG', e.print.position[0], e.print.position[0], e.print.imageWidth, e.print.imageHeight);
    //       pdf.save(e.print.legend ? 'legend.pdf' : 'map.pdf');
    //     } else  {
    //       // Save image as file
    //       e.canvas.toBlob(function(blob) {
    //         var name = (e.print.legend ? 'legend.' : 'map.')+e.imageType.replace('image/','');
    //         saveAs(blob, name);
    //       }, e.imageType, e.quality);
    //     }
    //   } else {
    //     console.warn('No canvas to export');
    //   }
    // });


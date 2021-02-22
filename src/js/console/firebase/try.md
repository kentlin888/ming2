cd\temp\caketech.com.tw

openssl pkcs12 -export -in certificate.crt -inkey private.key  -certfile ca_bundle.crt -out sample.pfx

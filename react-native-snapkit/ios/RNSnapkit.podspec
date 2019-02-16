
Pod::Spec.new do |s|
  s.name         = "RNSnapkit"
  s.version      = "1.0.0"
  s.summary      = "RNSnapkit"
  s.description  = <<-DESC
                  RNSnapkit
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNSnapkit.git", :tag => "master" }
  s.source_files  = "RNSnapkit/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  